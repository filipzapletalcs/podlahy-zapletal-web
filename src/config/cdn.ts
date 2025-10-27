// CDN konfigurace pro obrázky
export const CDN_CONFIG = {
  // Pro produkci - vždy použij GCS URL pro rychlé načítání
  CDN_BASE_URL: 'https://storage.googleapis.com/podlahy-zapletal-images',
  
  // Google Cloud Storage bucket URL (fallback)
  GCS_BASE_URL: 'https://storage.googleapis.com/podlahy-zapletal-images',
  
  // Lokální development
  LOCAL_BASE_URL: '',
};

/**
 * Získá optimalizovanou URL pro obrázek
 */
export function getImageUrl(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Vždy použij GCS pro rychlé načítání (také v developmentu pro testování)
  return `${CDN_CONFIG.CDN_BASE_URL}/${cleanPath}`;
}

/**
 * Získá optimalizovanou URL s responsive velikostmi a formáty
 */
export function getOptimizedImageUrl(imagePath: string, width?: number, format?: 'webp' | 'jpeg'): string {
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Pokud není specifikována velikost nebo formát, vrať původní z CDN
  if (!width && !format) {
    return `${CDN_CONFIG.CDN_BASE_URL}/${cleanPath}`;
  }
  
  // Získej název souboru bez přípony
  const pathWithoutExt = cleanPath.replace(/^Fotky_logo\//, '').replace(/\.[^/.]+$/, '');
  
  // Pro WebP formát - používej CDN
  if (format === 'webp') {
    const webpFilename = `${pathWithoutExt}_${width || 'original'}.webp`;
    return `${CDN_CONFIG.CDN_BASE_URL}/optimized/${webpFilename}`;
  }
  
  // Pro JPEG s jinou velikostí - používej CDN  
  if (width && format === 'jpeg') {
    const jpegFilename = `${pathWithoutExt}_${width}.jpg`;
    return `${CDN_CONFIG.CDN_BASE_URL}/optimized/${jpegFilename}`;
  }
  
  // Fallback na originál z CDN
  return `${CDN_CONFIG.CDN_BASE_URL}/${cleanPath}`;
}

/**
 * Přednastavené image paths pro rychlý přístup
 */
export const IMAGE_PATHS = {
  LOGO: 'Fotky_logo/Logo_podlahy_red.png',
  HERO_SLIDES: [
    'slide_01.jpg',
    'slide_04.jpg', 
    'slide_05.jpg',
    'slide_06.jpg',
    'SLIDE_vinyl.jpg'
  ],
  GALLERY: [
    'Fotky_logo/IMG_2254.jpg',
    'Fotky_logo/IMG_2255.jpg',
    'Fotky_logo/IMG_2256.jpg',
    'Fotky_logo/IMG_2257.jpg',
    'Fotky_logo/IMG_2258.jpg',
    'Fotky_logo/IMG_2259.jpg',
    'Fotky_logo/IMG_2260.jpg',
    'Fotky_logo/IMG_2261.jpg',
    'Fotky_logo/IMG_2262.jpg',
    'Fotky_logo/IMG_2263-2.jpg',
    'Fotky_logo/IMG_2264.jpg',
    'Fotky_logo/IMG_4942.jpg',
    'Fotky_logo/IMG_4943.jpg',
    'Fotky_logo/IMG_4945.jpg',
    'Fotky_logo/IMG_4947.jpg',
    'Fotky_logo/IMG_4959.jpg',
    'Fotky_logo/IMG_4962.jpg',
    'Fotky_logo/IMG_4964.jpg',
    'Fotky_logo/IMG_4967.jpg',
    'Fotky_logo/IMG_4977.jpg',
    'Fotky_logo/PXL_20250117_140905991.jpg',
    'Fotky_logo/PXL_20250117_140937206.jpg',
    'Fotky_logo/PXL_20250117_141033509.jpg',
    'Fotky_logo/PXL_20250117_141103043.jpg',
    'Fotky_logo/PXL_20250117_141118693.jpg'
  ]
};

/**
 * Next.js Image component props pro CDN optimalizaci
 */
export const CDN_IMAGE_PROPS = {
  // Povolené domény pro Next.js Image
  domains: [
    'storage.googleapis.com',
    'cdn.podlahyzapletal.cz', // Vaše CDN doména
  ],
  
  // Image sizes pro responsive design
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  
  // Formáty
  formats: ['image/webp'],
  
  // Kvalita
  quality: 85,
};