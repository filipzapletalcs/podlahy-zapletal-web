import React from 'react';
import { FastImage } from '@/components/ui/FastImage';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { StaggeredCards } from '@/components/animations/StaggeredCards';

const services = [
  {
    title: 'Prodej a montáž podlah',
    description: 'Kompletní služby od výběru materiálu až po finální instalaci všech typů podlah.',
    image: 'Fotky_logo/IMG_2254.jpg',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
      </svg>
    ),
    features: ['Dřevěné podlahy', 'Vinylové podlahy', 'Laminátové podlahy', 'Korkové podlahy'],
    link: '/podlahy'
  },
  {
    title: 'Interiérové a vchodové dveře',
    description: 'Široký výběr dveří různých materiálů a stylů, které dokonale sladíme s vaším interiérem.',
    image: 'Fotky_logo/IMG_4962.jpg',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM11 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM11 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" clipRule="evenodd"/>
      </svg>
    ),
    features: ['Falcové dveře', 'Bezfalcové dveře', 'Posuvné dveře', 'Bezpečnostní dveře'],
    link: '/dvere'
  },
  {
    title: 'Renovace a údržba',
    description: 'Profesionální renovace podlah včetně broušení, lakování a olejování pro obnovu krásy.',
    image: 'Fotky_logo/IMG_4945.jpg',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
      </svg>
    ),
    features: ['Broušení podlah', 'Lakování', 'Olejování', 'Podlahová chemie'],
    link: '/sluzby'
  }
];

export const HomeServices: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Co pro vás zajistíme?
          </h2>
          <div className="w-24 h-1 bg-red-700 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nabízíme kompletní řešení pro všechny typy podlah a dveří včetně poradenství, 
            dodávky materiálu a profesionální realizace.
          </p>
        </div>

        <StaggeredCards className="grid grid-cols-1 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
          {services.map((service, index) => (
            <div key={index} className="group h-full">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 hover:scale-105 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                  <FastImage
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-700 transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6 flex-grow">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600 transition-all duration-300 hover:text-red-700">
                        <svg className="w-4 h-4 text-red-700 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link href={service.link} className="mt-auto">
                    <Button variant="outline" className="w-full group-hover:bg-red-700 group-hover:text-white transition-all duration-300 transform hover:scale-105">
                      Více informací
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </StaggeredCards>

        <div className="text-center mt-12">
          <Link href="/sluzby">
            <Button size="lg" className="px-8">
              Zobrazit všechny služby
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};