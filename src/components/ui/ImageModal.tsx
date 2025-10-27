'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalImages?: number;
  allImages?: Array<{src: string; title: string; alt?: string}>;
  onImageSelect?: (index: number) => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src,
  alt,
  title,
  onPrevious,
  onNext,
  currentIndex,
  totalImages,
  allImages,
  onImageSelect
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-black bg-opacity-95"
      onClick={onClose}
    >
      {/* Header with controls */}
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center space-x-4">
          {/* Image counter */}
          {currentIndex !== undefined && totalImages && (
            <div className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium">
              {currentIndex + 1} / {totalImages}
            </div>
          )}
          {title && (
            <h3 className="text-lg font-semibold">{title}</h3>
          )}
        </div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main image area */}
      <div className="flex-1 flex items-center justify-center relative px-4 pb-4">
        {/* Previous button */}
        {onPrevious && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrevious(); }}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-16 h-16 flex items-center justify-center text-white transition-all duration-200 hover:scale-125"
          >
            <svg className="w-12 h-12 drop-shadow-lg" fill="white" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next button */}
        {onNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-16 h-16 flex items-center justify-center text-white transition-all duration-200 hover:scale-125"
          >
            <svg className="w-12 h-12 drop-shadow-lg" fill="white" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Main image */}
        <div className="relative max-h-[calc(100vh-200px)] max-w-full">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="object-contain max-h-[calc(100vh-200px)] w-auto h-auto"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Thumbnail strip at bottom */}
      {allImages && allImages.length > 1 && onImageSelect && (
        <div className="p-4 bg-black bg-opacity-50">
          <div className="flex space-x-2 overflow-x-auto pb-2 max-w-full">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); onImageSelect(index); }}
                className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentIndex 
                    ? 'border-white scale-110' 
                    : 'border-transparent hover:border-white hover:scale-105'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-white bg-opacity-20"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
        Použijte šipky nebo klikněte na náhledy pro navigaci • ESC pro zavření
      </div>
    </div>
  );
};