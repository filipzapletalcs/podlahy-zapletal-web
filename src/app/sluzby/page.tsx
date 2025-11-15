'use client';

import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { getImageUrl } from '@/config/cdn';
import { useEffect } from 'react';
import { smoothScrollToElement } from '@/utils/smoothScroll';

const mainServices = [
  {
    id: 'prodej-montaz-podlah',
    title: 'Prodej a montáž podlah',
    subtitle: 'Kompletní řešení pro všechny typy podlah',
    description: 'Nabízíme široký sortiment podlahových krytin - dřevěné, vinylové, laminátové, korkové podlahy a PVC krytiny. Specializujeme se na profesionální pokládku všech typů podlah.',
    image: '/Fotky_logo/IMG_2254.jpg',
    services: [
      'Pokládka dřevěných podlah',
      'Instalace vinylových a laminátových podlah',
      'Montáž korkových podlah',
      'Pokládka PVC krytin',
      'Profesionální poradenství při výběru',
      'Dodávka materiálů od renomovaných výrobců'
    ],
    link: '/podlahy'
  },
  {
    id: 'prodej-montaz-dveri',
    title: 'Prodej a montáž dveří',
    subtitle: 'Interiérové i vchodové dveře',
    description: 'Kompletní dodávka a montáž interiérových i vchodových dveří. Nabízme falcové, bezfalcové, posuvné i skleněné dveře v různých materiálech a provedních.',
    image: '/Fotky_logo/IMG_4945.jpg',
    services: [
      'Dodávka a montáž interiérových dveří',
      'Instalace vchodových dveří',
      'Montáž zárubní a klik',
      'Posuvné systémy',
      'Bezpečnostní dveře',
      'Široký výběr stylů a materiálů'
    ],
    link: '/dvere'
  },
  {
    id: 'renovace-udrzba-podlah',
    title: 'Renovace a údržba podlah',
    subtitle: 'Obnova krásy vašich podlah',
    description: 'Specializujeme se na renovaci a údržbu dřevěných podlah. Naše služby zahrňují broušení, lakování, olejování a opravy poškozených míst.',
    image: '/Fotky_logo/IMG_4962.jpg',
    services: [
      'Broušení dřevěných podlah',
      'Lakování a olejování',
      'Opravy poškozených míst',
      'Čištění a údržba',
      'Renovace starých parket',
      'Obnova lesku a ochrany'
    ]
  },
  {
    id: 'podlahova-chemie',
    title: 'Podlahová chemie',
    subtitle: 'Kvalitní produkty pro údržbu podlah',
    description: 'Prodáváme profesionální podlahovou chemii pro údržbu a ošetření všech typů podlah. Poradíme vám s výběrem vhodných produktů pro vaše podlahy.',
    image: '/Fotky_logo/IMG_4967.jpg',
    services: [
      'Čistící prostředky pro podlahy',
      'Oleje a vosky na dřevo',
      'Laky a impregnace',
      'Spotřební materiál',
      'Profesionální poradenství',
      'Dodavení na zakládku'
    ]
  }
];

export default function ServicesPage() {
  useEffect(() => {
    // Handle anchor scrolling when the page loads with a hash
    const hash = window.location.hash;
    if (hash) {
      const elementId = hash.substring(1); // Remove the # character
      setTimeout(() => {
        smoothScrollToElement(elementId);
      }, 100); // Small delay to ensure the page is rendered
    }
  }, []);

  return (
    <Layout>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Služby' }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl("Fotky_logo/IMG_4942.jpg")}
            alt="Naše služby"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Naše služby
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-amber-200 font-light">
            Kompletní řešení pro váš interiér
          </p>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Specializujeme se na podlahy, dveře, renovace a prodej podlahové chemie. 
            Díky více než 20letým zkušenostem vám garantujeme kvalitu a profesionální přístup.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/kontakt">
              <Button size="lg" className="bg-red-700 hover:bg-red-800 px-8 transform hover:scale-105 transition-all duration-300">
                Neznávazná poptávka
              </Button>
            </Link>
            <Link href="/galerie">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 transform hover:scale-105 transition-all duration-300">
                Prohlédnout galerii
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

      {/* Main Services */}
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

          <div className="space-y-32">
            {mainServices.map((service, index) => (
              <div key={index} id={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} space-y-8`}>
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h2>
                    <h3 className="text-xl text-red-700 font-medium mb-6">
                      {service.subtitle}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {service.services.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-4">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    {service.link ? (
                      <Link href={service.link}>
                        <Button className="px-8">
                          {service.title === 'Prodej a montáž podlah' ? 'Více o podlahách' :
                           service.title === 'Prodej a montáž dveří' ? 'Více o dveřích' :
                           'Více informací'}
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/kontakt">
                        <Button className="px-8">
                          Nezávazná poptávka
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative group">
                    <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-700">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Jak postupujeme</h2>
            <p className="text-xl text-gray-600">Náš proces od první konzultace po dokončení</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Konzultace',
                description: 'Probereme vaše potřeby a představy o nové podlaze'
              },
              {
                step: '02',
                title: 'Návrh',
                description: 'Připravíme návrh včetně výběru materiálů a cenové kalkulace'
              },
              {
                step: '03',
                title: 'Realizace',
                description: 'Profesionální pokládka podle domluvených termínů'
              },
              {
                step: '04',
                title: 'Předání',
                description: 'Kontrola kvality a předání dokončené práce'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}