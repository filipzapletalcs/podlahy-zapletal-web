import React from 'react';
import Image from 'next/image';
import { CountingNumber } from '@/components/ui/CountingNumber';

const stats = [
  { value: 20, suffix: '+', label: 'Let zkušeností' },
  { value: 2000, suffix: '+', label: 'Spokojených klientů' },
  { value: 2500, suffix: '+', label: 'Dokončených projektů' },
  { value: 97, suffix: '%', label: 'Spokojenost' }
];

export const About: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Proč si vybrat právě nás?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              S více než 20letou zkušeností v oboru poskytujeme komplexní služby 
              v oblasti pokládky a renovace podlah. Naším hlavním cílem je spokojenost 
              klienta a kvalita provedené práce.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                    <svg className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Profesionální přístup</h3>
                  <p className="text-gray-600">Každý projekt řešíme individuálně s ohledem na vaše potřeby.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                    <svg className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Kvalitní materiály</h3>
                  <p className="text-gray-600">Pracujeme pouze s osvědčenými dodavateli a kvalitními materiály.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                    <svg className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Garance kvality</h3>
                  <p className="text-gray-600">Na všechny práce poskytujeme dlouhodobou záruku.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/slide_05.jpg"
                alt="O nás"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats with Background */}
        <div className="mt-20 relative overflow-hidden rounded-lg py-12">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/slide_01.jpg"
              alt="Naše zkušenosti"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-800/90 to-red-600/90"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  <CountingNumber 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    duration={2500}
                    className="text-3xl md:text-4xl font-bold text-white"
                  />
                </div>
                <div className="text-white/90 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};