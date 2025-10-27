#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Konfigurace
const INPUT_DIR = '../public/Fotky_logo';
const OUTPUT_DIR = '../public/optimized';
const SIZES = [400, 800, 1200, 1920];
const WEBP_QUALITY = 85;
const JPEG_QUALITY = 90;

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
    console.log(`✅ Vytvořena složka: ${dir}`);
  }
}

async function optimizeImage(inputPath, filename) {
  const nameWithoutExt = path.parse(filename).name;
  const inputBuffer = await fs.readFile(inputPath);
  
  console.log(`🔄 Optimalizuji: ${filename}`);
  
  try {
    // Získej originální rozměry
    const metadata = await sharp(inputBuffer).metadata();
    const originalWidth = metadata.width;
    
    // Optimalizuj pro každou velikost
    for (const size of SIZES) {
      // Přeskoč velikosti větší než originál
      if (size > originalWidth) continue;
      
      // WebP verze
      const webpPath = path.join(OUTPUT_DIR, `${nameWithoutExt}_${size}.webp`);
      await sharp(inputBuffer)
        .resize(size, null, { 
          withoutEnlargement: true,
          fastShrinkOnLoad: false 
        })
        .webp({ quality: WEBP_QUALITY, effort: 6 })
        .toFile(webpPath);
      
      // JPEG verze (zmenšená)
      const jpegPath = path.join(OUTPUT_DIR, `${nameWithoutExt}_${size}.jpg`);
      await sharp(inputBuffer)
        .resize(size, null, { 
          withoutEnlargement: true,
          fastShrinkOnLoad: false 
        })
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toFile(jpegPath);
    }
    
    // Originální WebP verze
    const originalWebpPath = path.join(OUTPUT_DIR, `${nameWithoutExt}_original.webp`);
    await sharp(inputBuffer)
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(originalWebpPath);
    
    console.log(`✅ Hotovo: ${filename}`);
    
  } catch (error) {
    console.error(`❌ Chyba při optimalizaci ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Spouštím optimalizaci obrázků...');
  
  try {
    // Zajisti existenci výstupní složky
    await ensureDir(OUTPUT_DIR);
    
    // Získej seznam obrázků
    const files = await fs.readdir(INPUT_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );
    
    console.log(`📷 Nalezeno ${imageFiles.length} obrázků`);
    
    // Optimalizuj všechny obrázky
    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      await optimizeImage(inputPath, file);
    }
    
    console.log('🎉 Optimalizace dokončena!');
    
    // Zobraz statistiky
    const optimizedFiles = await fs.readdir(OUTPUT_DIR);
    console.log(`📊 Vytvořeno ${optimizedFiles.length} optimalizovaných souborů`);
    
  } catch (error) {
    console.error('❌ Chyba při optimalizaci:', error);
    process.exit(1);
  }
}

// Spusť pouze pokud je skript volán přímo
if (require.main === module) {
  main();
}

module.exports = { optimizeImage, SIZES, WEBP_QUALITY, JPEG_QUALITY };