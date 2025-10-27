'use client';

import { useEffect } from 'react';
import { getOptimizedImageUrl } from '@/config/cdn';

interface CriticalImagePreloaderProps {
  images: string[];
}

/**
 * Preloaduje kritické obrázky pro rychlejší LCP
 */
export const CriticalImagePreloader: React.FC<CriticalImagePreloaderProps> = ({ images }) => {
  useEffect(() => {
    // Preload pouze první kritický obrázek
    const firstImage = images[0];
    if (firstImage) {
      // Preload WebP verze
      const webpUrl = getOptimizedImageUrl(firstImage, 1920, 'webp');
      const jpegUrl = getOptimizedImageUrl(firstImage, 1920, 'jpeg');
      
      // Vytvořit link preload elementy
      const createPreloadLink = (href: string, type: string) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = href;
        link.type = type;
        document.head.appendChild(link);
        return link;
      };

      const webpLink = createPreloadLink(webpUrl, 'image/webp');
      const jpegLink = createPreloadLink(jpegUrl, 'image/jpeg');

      // Cleanup při unmount
      return () => {
        try {
          document.head.removeChild(webpLink);
          document.head.removeChild(jpegLink);
        } catch {
          // Ignoruj chyby při cleanup
        }
      };
    }
  }, [images]);

  return null; // Komponenta nerenduje nic
};