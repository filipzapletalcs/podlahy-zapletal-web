import React from 'react';
import { getOptimizedImageUrl } from '@/config/cdn';

interface FastImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Optimalizovaná image komponenta s WebP podporou a responsive velikostmi
 */
export const FastImage: React.FC<FastImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
  fetchPriority = 'auto'
}) => {
  const loadingAttr = priority ? 'eager' : loading;

  // Použij jednoduché WebP URL místo složitých srcset
  const webpUrl = getOptimizedImageUrl(src, 800, 'webp');
  const jpegUrl = getOptimizedImageUrl(src, 800, 'jpeg');

  return (
    <picture>
      {/* WebP verze pro moderní prohlížeče */}
      <source 
        srcSet={webpUrl}
        type="image/webp"
      />
      {/* JPEG verze pro starší prohlížeče */}
      <source 
        srcSet={jpegUrl}
        type="image/jpeg"
      />
      {/* Fallback img tag - použij WebP jako primární */}
      <img
        src={webpUrl}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loadingAttr}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  );
};