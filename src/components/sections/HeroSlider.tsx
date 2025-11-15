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

  // Preload images - only first image eagerly, rest lazy
  useEffect(() => {
    const preloadImages = async () => {
      // Load first image immediately
      const firstImagePromise = new Promise<void>((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => {
          setImagesLoaded(prev => {
            const newState = [...prev];
            newState[0] = true;
            return newState;
          });
          resolve();
        };
        img.onerror = reject;
        // First image at higher quality for LCP
        img.src = getOptimizedImageUrl(heroImages[0].src, 1200, 'webp');
      });

      try {
        await firstImagePromise;
        setAllImagesLoaded(true);

        // Load remaining images lazily after first one
        heroImages.slice(1).forEach((image, idx) => {
          const img = document.createElement('img');
          img.onload = () => {
            setImagesLoaded(prev => {
              const newState = [...prev];
              newState[idx + 1] = true;
              return newState;
            });
          };
          // Remaining images at lower quality
          img.src = getOptimizedImageUrl(image.src, 1200, 'webp');
        });
      } catch {
        // Still allow slider to work even if first image fails
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
    <section className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
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
                quality={index === 0 ? 85 : 75}
                sizes="100vw"
                srcSet={`
                  ${getOptimizedImageUrl(image.src, 640, 'webp')} 640w,
                  ${getOptimizedImageUrl(image.src, 768, 'webp')} 768w,
                  ${getOptimizedImageUrl(image.src, 1024, 'webp')} 1024w,
                  ${getOptimizedImageUrl(image.src, 1200, 'webp')} 1200w,
                  ${getOptimizedImageUrl(image.src, 1920, 'webp')} 1920w
                `}
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
      <div className="relative z-30 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-6 md:space-y-12"
        >
          {/* Logo */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
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

          {/* Main Heading - visible H1 */}
          <motion.div
            className="space-y-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white leading-relaxed px-4">
              Profesionální pokládka podlah a&nbsp;montáž dveří v&nbsp;Kroměříži
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto px-4">
              Více než 20 let zkušeností. Parkety, laminát, vinyl a dveře.
            </p>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-4 sm:pt-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/virtualni-prohlidka">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Button
                  size="lg"
                  className="bg-white/95 text-gray-900 hover:bg-white w-full sm:w-[220px] px-8 py-4 font-medium border-0 shadow-2xl hover:shadow-white/20 transition-all duration-500 backdrop-blur-sm"
                >
                  Virtuální prohlídka
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
                  className="bg-red-700 text-white hover:bg-red-800 w-full sm:w-[220px] px-8 py-4 font-medium border-0 shadow-2xl hover:shadow-red-900/30 transition-all duration-500"
                >
                  Nezávazná poptávka
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

      </div>

      {/* Apple-style Image Indicators - Bottom of screen */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentImage(index)}
            aria-label={`Přejít na obrázek ${index + 1}: ${heroImages[index].title}`}
            className="group relative flex items-center justify-center p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {index === currentImage ? (
              // Active indicator - red pill
              <motion.div
                layoutId="activeSlide"
                className="w-8 h-2 rounded-full bg-red-600"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            ) : (
              // Inactive indicator - white dot
              <div className="w-2 h-2 rounded-full bg-white/60 group-hover:bg-white/90 transition-colors duration-300" />
            )}
          </motion.button>
        ))}
      </motion.div>

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