'use client';

import React, { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ImageModal } from '@/components/ui/ImageModal';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParallaxSection } from '@/components/animations/ParallaxSection';
import { StaggeredCards } from '@/components/animations/StaggeredCards';
import { getImageUrl } from '@/config/cdn';
import { CountingNumber } from '@/components/ui/CountingNumber';
import { GallerySkeletonGrid } from '@/components/ui/SkeletonLoader';

// Všechny fotky z galerie
const galleryImages = [
  {
    src: 'https://storage.googleapis.com/podlahy-zapletal-images/Fotky_logo/IMG_2254.jpg',
    title: 'Luxusní obývací prostor',
    description: 'Dřevěné podlahy v kombinaci s moderním designem',
    category: 'drevene',
    height: 'tall'
  },
  {
    src: '/Fotky_logo/IMG_2255.jpg',
    title: 'Moderní chodba',
    description: 'Elegantní řešení pro průchozí prostory',
    category: 'drevene',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/IMG_2256.jpg',
    title: 'Stylový interiér',
    description: 'Harmonické propojení prostorů',
    category: 'drevene',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/IMG_2257.jpg',
    title: 'Kuchyňský prostor',
    description: 'Praktické a estetické řešení',
    category: 'vinylove',
    height: 'tall'
  },
  {
    src: '/Fotky_logo/IMG_2258.jpg',
    title: 'Obývací pokoj',
    description: 'Teplá atmosféra díky dřevěným podlahám',
    category: 'drevene',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/IMG_2259.jpg',
    title: 'Designová ložnice',
    description: 'Minimalistický přístup k bydlení',
    category: 'laminatove',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/IMG_2260.jpg',
    title: 'Prostorná hala',
    description: 'Reprezentativní vstupní prostor',
    category: 'drevene',
    height: 'tall'
  },
  {
    src: '/Fotky_logo/IMG_2261.jpg',
    title: 'Kancelářský prostor',
    description: 'Profesionální prostředí s kvalitními podlahami',
    category: 'vinylove',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/IMG_2262.jpg',
    title: 'Rodinný dům',
    description: 'Kompletní realizace podlah',
    category: 'drevene',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/IMG_2263-2.jpg',
    title: 'Moderní byt',
    description: 'Městské bydlení s nadčasovým designem',
    category: 'laminatove',
    height: 'tall'
  },
  {
    src: '/Fotky_logo/IMG_2264.jpg',
    title: 'Luxusní vila',
    description: 'Exkluzivní řešení pro náročné klienty',
    category: 'drevene',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/IMG_4942.jpg',
    title: 'Stylové chodby',
    description: 'Propojení jednotlivých místností',
    category: 'drevene',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/IMG_4943.jpg',
    title: 'Designový prostor',
    description: 'Kreativní přístup k interiéru',
    category: 'vinylove',
    height: 'tall'
  },
  {
    src: '/Fotky_logo/IMG_4945.jpg',
    title: 'Kvalitní provedení',
    description: 'Detailní zpracování všech prvků',
    category: 'drevene',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/IMG_4947.jpg',
    title: 'Rodinné bydlení',
    description: 'Pohodlí a funkcionalita',
    category: 'laminatove',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/IMG_4959.jpg',
    title: 'Moderní kuchyň',
    description: 'Praktické řešení pro každodenní život',
    category: 'vinylove',
    height: 'tall'
  },
  {
    src: '/Fotky_logo/IMG_4962.jpg',
    title: 'Elegantní hala',
    description: 'První dojem při vstupu do domu',
    category: 'drevene',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/IMG_4964.jpg',
    title: 'Světlý prostor',
    description: 'Maximální využití přirozeného světla',
    category: 'laminatove',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/IMG_4967.jpg',
    title: 'Útulný domov',
    description: 'Teplo a pohodlí v každém detailu',
    category: 'drevene',
    height: 'tall'
  },
  {
    src: '/Fotky_logo/IMG_4977.jpg',
    title: 'Profesionální práce',
    description: 'Precizní provedení podle požadavků',
    category: 'vinylove',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/PXL_20250117_140905991.jpg',
    title: 'Parkety v praxi',
    description: 'Dřevěné podlahy v obývacím prostoru',
    category: 'drevene',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/PXL_20250117_140937206.jpg',
    title: 'Kvalitní materiály',
    description: 'Pouze prověřené a kvalitní produkty',
    category: 'drevene',
    height: 'tall'
  },
  {
    src: '/Fotky_logo/PXL_20250117_141033509.jpg',
    title: 'Detailní práce',
    description: 'Péče o každý detail realizace',
    category: 'laminatove',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/PXL_20250117_141103043.jpg',
    title: 'Moderní trendy',
    description: 'Aktuální designové směry v podlahách',
    category: 'vinylove',
    height: 'medium'
  },
  {
    src: '/Fotky_logo/PXL_20250117_141118693.jpg',
    title: 'Kompletní realizace',
    description: 'Od návrhu po finální úklid',
    category: 'drevene',
    height: 'tall'
  }
];

const categories = [
  { id: 'all', name: 'Všechny realizace', count: galleryImages.length },
  { id: 'drevene', name: 'Dřevěné podlahy', count: galleryImages.filter(img => img.category === 'drevene').length },
  { id: 'vinylove', name: 'Vinylové podlahy', count: galleryImages.filter(img => img.category === 'vinylove').length },
  { id: 'laminatove', name: 'Laminátové podlahy', count: galleryImages.filter(img => img.category === 'laminatove').length }
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Show all images (no filtering)
  const filteredImages = galleryImages;

  // Simulate image loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (image: typeof galleryImages[0], index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handlePreviousImage = () => {
    const prevIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : filteredImages.length - 1;
    setSelectedImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleNextImage = () => {
    const nextIndex = selectedImageIndex < filteredImages.length - 1 ? selectedImageIndex + 1 : 0;
    setSelectedImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
    setSelectedImage(filteredImages[index]);
  };

  return (
    <Layout>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Galerie' }]} />
        </div>
      </div>

      {/* Hero Section */}
      <ParallaxSection offset={50}>
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl("Fotky_logo/PXL_20250117_140905991.jpg")}
            alt="Galerie našich realizací"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Galerie realizací
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-amber-200 font-light">
            Více než 500 úspěšných projektů
          </p>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Prohlédněte si naše nejlepší práce a inspirujte se pro váš domov. 
            Každý projekt je příběh o kvalitě, preciznosti a spokojenosti našich klientů.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="#galerie">
              <Button size="lg" className="bg-red-700 hover:bg-red-800 px-8 transform hover:scale-105 transition-all duration-300">
                Prohlédnout realizace
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 transform hover:scale-105 transition-all duration-300">
                Nezávazná poptávka
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="m19 14-7 7m0 0-7-7m7 7V3"></path>
          </svg>
        </div>
        </section>
      </ParallaxSection>


      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Show skeleton while loading */}
          {!imagesLoaded ? (
            <GallerySkeletonGrid count={12} />
          ) : (
            /* Bento Grid Layout */
            <StaggeredCards
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              staggerDelay={0.03}
            >
              {filteredImages.map((image, index) => {
              // Jednoduchý a pravidelný pattern velikostí
              const getCardHeight = (index: number) => {
                // Každých 12 karet se opakuje pattern
                const patterns = [
                  'h-64',  // 0 - malá
                  'h-80',  // 1 - střední
                  'h-64',  // 2 - malá
                  'h-96',  // 3 - velká
                  'h-64',  // 4 - malá
                  'h-80',  // 5 - střední
                  'h-64',  // 6 - malá
                  'h-64',  // 7 - malá
                  'h-80',  // 8 - střední
                  'h-64',  // 9 - malá
                  'h-96',  // 10 - velká
                  'h-80',  // 11 - střední
                ];
                
                return patterns[index % patterns.length];
              };
              
              const cardHeight = getCardHeight(index);
              
              return (
                <div
                  key={`${image.src}-${index}`}
                  className="group cursor-pointer"
                  onClick={() => handleImageClick(image, index)}
                >
                  <div className={`relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white ${cardHeight}`}>
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Simple hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    
                    {/* Zoom icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </StaggeredCards>
          )}

          {/* Load More Button (placeholder) */}
          {imagesLoaded && (
            <div className="text-center mt-16">
              <button className="px-8 py-3 bg-red-700 text-white rounded-full hover:bg-red-800 transition-colors duration-300 font-medium">
                Načíst další realizace
              </button>
            </div>
          )}
        </div>
      </section>


      {/* Stats Section */}
      <ScrollReveal direction="up" delay={0.4}>
        <section className="py-20 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src={getImageUrl("Fotky_logo/IMG_4967.jpg")}
              alt="Naše zkušenosti"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-800/90 to-red-600/90"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggeredCards className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white" staggerDelay={0.2}>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  <CountingNumber 
                    end={2500} 
                    suffix="+" 
                    duration={2500}
                    className="text-3xl md:text-4xl font-bold text-white"
                  />
                </div>
                <div className="text-white/90 font-medium">Dokončených projektů</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  <CountingNumber 
                    end={20} 
                    suffix="+" 
                    duration={2500}
                    className="text-3xl md:text-4xl font-bold text-white"
                  />
                </div>
                <div className="text-white/90 font-medium">Let zkušeností</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  <CountingNumber 
                    end={97} 
                    suffix="%" 
                    duration={2500}
                    className="text-3xl md:text-4xl font-bold text-white"
                  />
                </div>
                <div className="text-white/90 font-medium">Spokojenost klientů</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  <CountingNumber 
                    end={25} 
                    suffix="+" 
                    duration={2500}
                    className="text-3xl md:text-4xl font-bold text-white"
                  />
                </div>
                <div className="text-white/90 font-medium">Realizací měsíčně</div>
              </div>
            </StaggeredCards>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal direction="up" delay={0.5}>
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Inspirovala vás některá z našich realizací?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Kontaktujte nás a společně vytvoříme podobný projekt pro váš domov
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/kontakt" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-700 hover:bg-red-800 transition-colors"
              >
                Nezávazná poptávka
              </a>
              <a 
                href="/podlahy" 
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-red-700 text-base font-medium rounded-md text-red-700 hover:bg-red-700 hover:text-white transition-colors"
              >
                Prohlédnout nabídku
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Image Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        src={selectedImage?.src || ''}
        alt={selectedImage?.title || ''}
        title={selectedImage?.title}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
        currentIndex={selectedImageIndex}
        totalImages={filteredImages.length}
        allImages={filteredImages.map(img => ({ src: img.src, title: img.title, alt: img.title }))}
        onImageSelect={handleImageSelect}
      />
    </Layout>
  );
}