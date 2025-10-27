import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

const services = [
  {
    title: 'Dřevěné podlahy',
    description: 'Klasická elegance a teplo přírodního dřeva pro váš domov.',
    image: '/slide_01.jpg',
    features: ['Masivní dřevo', 'Parkety', 'Renovace', 'Lakování']
  },
  {
    title: 'Vinylové podlahy',
    description: 'Moderní a praktické řešení s vysokou odolností.',
    image: '/SLIDE_vinyl.jpg',
    features: ['Voděodolné', 'Snadná údržba', 'Velký výběr', 'Rychlá montáž']
  },
  {
    title: 'Laminátové podlahy',
    description: 'Cenově dostupné řešení s překrásným vzhledem.',
    image: '/slide_04.jpg',
    features: ['Odolné vůči oděru', 'Snadná pokládka', 'Široký výběr', 'Dobrý poměr cena/výkon']
  }
];

export const Services: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Naše služby
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nabízíme kompletní řešení pro všechny typy podlah včetně poradenství, 
            dodávky materiálu a profesionální pokládky.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-red-700 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  Více informací
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">
            Zobrazit všechny služby
          </Button>
        </div>
      </div>
    </section>
  );
};