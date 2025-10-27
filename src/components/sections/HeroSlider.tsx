'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { getOptimizedImageUrl } from '@/config/cdn';
import Image from 'next/image';
import Link from 'next/link';

const heroImages = [
  {
    src: "Fotky_logo/IMG_2254.jpg",
    title: 'Luxusní obývací prostory',
    subtitle: 'Dřevěné podlahy v kombinaci s moderním designem'
  },
  {
    src: "Fotky_logo/PXL_20250117_140905991.jpg",
    title: 'Parkety nejvyšší kvality',
    subtitle: 'Přírodní krása a nadčasová elegance'
  },
  {
    src: "Fotky_logo/IMG_4942.jpg",
    title: 'Moderní interiéry',
    subtitle: 'Stylové řešení pro současné bydlení'
  },
  {
    src: "Fotky_logo/IMG_2260.jpg",
    title: 'Prostorné haly',
    subtitle: 'Reprezentativní vstupní prostory'
  },
  {
    src: "Fotky_logo/IMG_4967.jpg",
    title: 'Útulné domovy',
    subtitle: 'Teplo a pohodlí v každém detailu'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(Array(heroImages.length).fill(false));
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = heroImages.map((image, index) => {
        return new Promise<void>((resolve, reject) => {
          const img = document.createElement('img');
          img.onload = () => {
            setImagesLoaded(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            resolve();
          };
          img.onerror = reject;
          // Use proper CDN URLs
          img.src = getOptimizedImageUrl(image.src, 1200, 'webp');
        });
      });

      try {
        await Promise.all(imagePromises);
        setAllImagesLoaded(true);
      } catch {
        // Still allow slider to work even if some images fail
        setAllImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!allImagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [allImagesLoaded]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Smooth Transitions */}
      <div className="absolute inset-0 z-0">
        {/* Render all images but only show current one */}
        {heroImages.map((image, index) => {
          const imageUrl = getOptimizedImageUrl(image.src, 1200, 'webp');
          
          return (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: index === currentImage ? 1 : 0,
                scale: index === currentImage ? 1 : 1.02
              }}
              transition={{ 
                duration: 1.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 1.2 },
                scale: { duration: 2 }
              }}
            >
              <Image
                src={imageUrl}
                alt={image.title}
                fill
                className="object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0}
                quality={85}
                sizes="100vw"
                style={{
                  opacity: imagesLoaded[index] ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              />
            </motion.div>
          );
        })}
        
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
        
        {/* Loading overlay - shown until all images are loaded */}
        {!allImagesLoaded && (
          <motion.div
            className="absolute inset-0 bg-gray-900 z-20 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm opacity-70">Načítání galerie...</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-30 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-12"
        >
          {/* Logo */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative">
              <Image
                src="/Logo_podlahy.png"
                alt="Podlahy Zapletal"
                width={400}
                height={120}
                className="h-20 md:h-28 lg:h-32 w-auto object-contain drop-shadow-2xl"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-white/10 blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="space-y-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto" />
            <p className="text-xl md:text-2xl font-light text-white leading-relaxed">
              Více než 20 let zkušeností s pokládkou podlah a dveří
            </p>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Specializujeme se na kvalitní parkety, laminát, vinyl a dveře.
            </p>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/galerie">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Button 
                  size="lg" 
                  className="bg-white/95 text-gray-900 hover:bg-white px-10 py-4 font-medium border-0 shadow-2xl hover:shadow-white/20 transition-all duration-500 backdrop-blur-sm"
                >
                  Prohlédnout galerii
                </Button>
              </motion.div>
            </Link>
            
            <Link href="/kontakt">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/70 text-white hover:bg-white/15 backdrop-blur-sm px-10 py-4 font-medium transition-all duration-500 hover:border-white"
                >
                  Nezávazná poptávka
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Minimal Image Indicators */}
        <motion.div 
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentImage(index)}
              aria-label={`Přejít na obrázek ${index + 1}: ${heroImages[index].title}`}
              className={`relative w-3 h-3 rounded-full transition-all duration-700 ${
                index === currentImage 
                  ? 'bg-white scale-125 shadow-lg shadow-white/30' 
                  : 'bg-white/30 hover:bg-white/60'
              }`}
              whileHover={{ scale: index === currentImage ? 1.25 : 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {index === currentImage && (
                <motion.div
                  className="absolute inset-0 bg-white rounded-full"
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-white/80 to-transparent"
        />
      </motion.div>
    </section>
  );
};