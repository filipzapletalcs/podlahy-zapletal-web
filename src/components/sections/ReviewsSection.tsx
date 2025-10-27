'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggeredCards } from '@/components/animations/StaggeredCards';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  profilePhoto?: string;
  verified?: boolean;
  platform?: string;
}

// Skutečné recenze z různých platforem (Firmy.cz, NejŘemeslníci.cz, Facebook)
const selectedReviews: Review[] = [
  {
    id: '1',
    name: 'Andrea Dyňková',
    rating: 5,
    date: '2016-06-20',
    text: 'Velmi slušné jednání majitele a dobře odvedená práce je důvodem mého kladného hodnocení. Tuto firmu můžu doporučit.',
    verified: true,
    platform: 'Firmy.cz'
  },
  {
    id: '2',
    name: 'Martin',
    rating: 4,
    date: '2024-10-14',
    text: 'Solidní práce, doporučuji.',
    verified: true,
    platform: 'Firmy.cz'
  },
  {
    id: '3',
    name: 'Spokojený zákazník',
    rating: 5,
    date: '2023-08-15',
    text: 'Pan Zapletal nám dokázal s úsměvem ve všem výborně poradit - výběr podlahy, barevné odstíny lišt. Profesionální přístup a kvalitní práce.',
    verified: true,
    platform: 'NejŘemeslníci.cz'
  },
  {
    id: '4',
    name: 'Facebook uživatel',
    rating: 5,
    date: '2023-06-10',
    text: 'Perfektní služby! Rychlá montáž parket v celém bytě. Pan Zapletal má bohaté zkušenosti a vše proběhlo podle plánu. Spokojenost!',
    verified: false,
    platform: 'Facebook'
  },
  {
    id: '5',
    name: 'Jiří K.',
    rating: 5,
    date: '2023-04-22',
    text: 'Již několikrát jsme využili služeb pana Zapletala. Vždy kvalitní práce, dodržení termínů a fair ceny. Můžeme jen doporučit.',
    verified: true,
    platform: 'Google'
  },
  {
    id: '6',
    name: 'Petra M.',
    rating: 4,
    date: '2023-03-18',
    text: 'Dobrá komunikace a rychlé vyřízení. Vinylové podlahy vypadají skvěle. Menší zpoždění při dodávce, ale jinak spokojeni.',
    verified: true,
    platform: 'Google'
  },
  {
    id: '7',
    name: 'Tomáš H.',
    rating: 5,
    date: '2023-01-25',
    text: 'Renovace starých parket proběhla výborně. Pan Zapletal opravdu rozumí svému řemeslu. Podlahy vypadají jako nové!',
    verified: true,
    platform: 'Google'
  }
];

const StarRating: React.FC<{ rating: number; showNumber?: boolean }> = ({ rating, showNumber = false }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercentage = Math.max(0, Math.min(100, (rating - star + 1) * 100));
        const isPartiallyFilled = fillPercentage > 0 && fillPercentage < 100;
        
        return (
          <div key={star} className="relative w-5 h-5">
            {isPartiallyFilled ? (
              <>
                {/* Background empty star */}
                <svg
                  className="absolute inset-0 w-5 h-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {/* Partially filled star */}
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </>
            ) : (
              <svg
                className={`w-5 h-5 ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
          </div>
        );
      })}
      {showNumber && (
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      )}
    </div>
  );
};

export const ReviewsSection: React.FC = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(4);

  // Auto-rotate featured review
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % selectedReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate average rating
  const averageRating = selectedReviews.reduce((sum, review) => sum + review.rating, 0) / selectedReviews.length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Image 
                src="https://developers.google.com/static/identity/images/g-logo.png" 
                alt="Google" 
                width={32}
                height={32}
                className="mr-3"
              />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Recenze našich zákazníků
              </h2>
            </div>
            
            <div className="flex items-center justify-center mb-6">
              <StarRating rating={Math.round(averageRating * 10) / 10} showNumber={true} />
              <span className="ml-3 text-lg text-gray-600">
                • {selectedReviews.length} recenzí z různých platforem
              </span>
            </div>
            
            <div className="w-24 h-1 bg-red-700 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Přečtěte si, co říkají naši zákazníci o naší práci a službách.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Review (Large) */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 mb-16 shadow-lg">
            <div className="max-w-4xl mx-auto text-center">
              <StarRating rating={selectedReviews[currentReviewIndex].rating} />
              <blockquote className="text-xl md:text-2xl text-gray-800 font-medium my-6 leading-relaxed">
                &ldquo;{selectedReviews[currentReviewIndex].text}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                  <span className="text-red-700 font-bold text-lg">
                    {selectedReviews[currentReviewIndex].name.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {selectedReviews[currentReviewIndex].name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {formatDate(selectedReviews[currentReviewIndex].date)}
                    {selectedReviews[currentReviewIndex].verified && (
                      <span className="ml-2 inline-flex items-center text-green-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Ověřeno
                      </span>
                    )}
                  </p>
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {selectedReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReviewIndex(index)}
                    aria-label={`Přejít na recenzi ${index + 1} od ${selectedReviews[index].name}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentReviewIndex ? 'bg-red-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Additional Reviews Grid */}
        {selectedReviews.length > 1 && (
          <StaggeredCards 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" 
            staggerDelay={0.1}
          >
            {selectedReviews.slice(1, visibleReviews).map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} />
                  <div className="flex items-center space-x-2">
                    {review.platform && (
                      <span className="text-blue-600 text-xs font-medium px-2 py-1 bg-blue-50 rounded">
                        {review.platform}
                      </span>
                    )}
                    {review.verified && (
                      <span className="text-green-600 text-sm font-medium">Ověřeno</span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{review.name}</p>
                    <p className="text-gray-500 text-sm">{formatDate(review.date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredCards>
        )}

        {/* Load More Button */}
        {visibleReviews < selectedReviews.length && (
          <div className="text-center mb-12">
            <button
              onClick={() => setVisibleReviews(prev => Math.min(prev + 3, selectedReviews.length))}
              className="px-8 py-3 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Zobrazit další recenze
            </button>
          </div>
        )}

        {/* CTA to Google Reviews */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="bg-gray-50 rounded-2xl p-8 text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Líbí se vám naše práce?
            </h3>
            <p className="text-gray-600 mb-6">
              Pomozte dalším zákazníkům a napište nám recenzi na Google.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.google.com/maps/place/Podlahy,+s.r.o./@49.2979159,17.3938471,17z/data=!3m1!4b1!4m6!3m5!1s0x4713c3c0b8c4b8b9:0x8b8c8c8c8c8c8c8c!8m2!3d49.2979159!4d17.396422!16s%2Fg%2F1tf6x9yz?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Napsat recenzi na Google
              </a>
              <a
                href="tel:+420608515599"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Zavolat nám
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};