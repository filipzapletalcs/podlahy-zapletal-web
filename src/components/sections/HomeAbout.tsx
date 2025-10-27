import React from 'react';
import { FastImage } from '@/components/ui/FastImage';
import { Button } from '@/components/ui/Button';
import { CountingNumber } from '@/components/ui/CountingNumber';
import Link from 'next/link';

export const HomeAbout: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Více než 20 let
                <span className="block text-red-700">zkušeností s podlahami</span>
              </h2>
              <div className="w-24 h-1 bg-red-700 mb-8"></div>
            </div>

            <div className="space-y-6 text-lg text-gray-700">
              <p className="leading-relaxed">
                Na trhu působíme již přes <strong>20 let</strong>, během nichž jsme nasbírali bohaté zkušenosti 
                s prodejem a montáží podlah i dveří. Naším hlavním cílem je spokojenost klienta 
                a individuální přístup ke každému projektu.
              </p>
              <p className="leading-relaxed">
                Kromě podlah se specializujeme i na interiérové a vchodové dveře, které dokonale 
                sladíme s vaším interiérem. Poskytujeme také podlahovou chemii pro údržbu 
                specifických povrchů.
              </p>
            </div>

            {/* Quick Stats with Background */}
            <div className="relative overflow-hidden rounded-2xl py-8">
              {/* Background */}
              <div className="absolute inset-0 z-0">
                <FastImage
                  src="Fotky_logo/IMG_4977.jpg"
                  alt="Naše práce"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-800/90 to-red-600/90"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 grid grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-white mb-2">
                    <CountingNumber end={2500} suffix="+" className="text-3xl font-bold text-white" />
                  </div>
                  <div className="text-white/90 text-sm uppercase tracking-wide font-medium">Realizací</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-white mb-2">
                    <CountingNumber end={97} suffix="%" className="text-3xl font-bold text-white" />
                  </div>
                  <div className="text-white/90 text-sm uppercase tracking-wide font-medium">Spokojenost</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/galerie">
                <Button size="lg" variant="outline" className="px-8">
                  Naše realizace
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <FastImage
                    src="Fotky_logo/IMG_2255.jpg"
                    alt="Dřevěné podlahy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <FastImage
                    src="Fotky_logo/IMG_4943.jpg"
                    alt="Moderní interiéry"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-32 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <FastImage
                    src="Fotky_logo/IMG_2258.jpg"
                    alt="Kvalitní práce"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <FastImage
                    src="Fotky_logo/PXL_20250117_140937206.jpg"
                    alt="Parkety"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-100 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-100 rounded-full opacity-50 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};