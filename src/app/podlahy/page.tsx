'use client';

import { Layout } from '@/components/layout/Layout';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useEffect } from 'react';
import { smoothScrollToElement } from '@/utils/smoothScroll';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';

const flooringTypes = [
  {
    id: 'drevene-podlahy',
    title: 'Dřevěné podlahy',
    subtitle: 'Nadčasová elegance a přírodní krása',
    description: 'Dřevěné podlahy jsou synonymem luxusu, kvality a dlouhé životnosti. Díky své přirozené kráse a jedinečné struktuře dodávají interiéru teplo a útulnost.',
    image: '/Fotky_logo/IMG_2254.jpg',
    features: [
      'Přírodní materiál s jedinečným vzhledem',
      'Možnost renovace – broušení, lakování, olejování',
      'Vynikající tepelná a zvuková izolace'
    ]
  },
  {
    id: 'vinylove-podlahy',
    title: 'Vinylové podlahy',
    subtitle: 'Moderní design a vysoká odolnost',
    description: 'Vinylové podlahy jsou praktické, odolné a nenáročné na údržbu. Díky pokročilým technologiím věrně napodobují dřevo, kámen nebo beton.',
    image: '/Fotky_logo/IMG_4962.jpg',
    features: [
      'Vysoká odolnost vůči vodě, poškrábání a opotřebení',
      'Široká škála dekorů – od dřeva po betonové efekty',
      'Příjemný a teplý povrch, ideální i pro podlahové vytápění'
    ]
  },
  {
    id: 'laminatove-podlahy',
    title: 'Laminátové podlahy',
    subtitle: 'Kvalitní vzhled za rozumnou cenu',
    description: 'Laminátové podlahy kombinují estetiku, odolnost a cenovou dostupnost. Díky moderním technologiím nabízejí širokou škálu dekorů s realistickou strukturou.',
    image: '/Fotky_logo/IMG_2260.jpg',
    features: [
      'Cenově dostupná alternativa k dřevěným podlahám',
      'Rychlá a jednoduchá pokládka díky zámkovému systému',
      'Odolnost vůči poškrábání a mechanickému poškození'
    ]
  },
  {
    id: 'korkove-podlahy',
    title: 'Korkové podlahy',
    subtitle: 'Přírodní komfort a dokonalá izolace',
    description: 'Korkové podlahy jsou ekologické, měkké a příjemné na došlap. Díky své pružnosti snižují zátěž kloubů a páteře.',
    image: '/Fotky_logo/IMG_4967.jpg',
    features: [
      '100% přírodní materiál s výbornou tepelnou izolací',
      'Měkký a pohodlný povrch, tlumící kročejový hluk',
      'Antialergenní a odolný vůči plísním'
    ]
  },
  {
    id: 'pvc-podlahy',
    title: 'PVC podlahy',
    subtitle: 'Odolné a praktické řešení',
    description: 'PVC podlahy jsou ekonomicky výhodné, vysoce odolné a snadno udržovatelné. Díky své voděodolnosti jsou ideální pro kuchyně, chodby i kanceláře.',
    image: '/Fotky_logo/IMG_4942.jpg',
    features: [
      'Voděodolnost a vysoká odolnost proti opotřebení',
      'Snadná údržba – ideální do domácností s dětmi a mazlíčky',
      'Široká škála dekorů – od dřeva po kámen'
    ]
  },
  {
    id: 'koberce',
    title: 'Koberce',
    subtitle: 'Komfort, teplo a útulnost',
    description: 'Koberce přinášejí měkkost, zvukovou izolaci a pocit luxusu. Jsou skvělou volbou do ložnic, obývacích pokojů i kanceláří.',
    image: '/Fotky_logo/PXL_20250117_140905991.jpg',
    features: [
      'Měkký a příjemný povrch pro maximální komfort',
      'Výborná tepelná a zvuková izolace',
      'Široká paleta barev a vzorů pro každý interiér'
    ]
  }
];

// Features pro sekci zkušeností
const expertiseFeatures = [
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: 'Kvalitní materiály',
    description: 'Pracujeme pouze s renomovanými výrobci a ověřenými materiály pro dlouhou životnost.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Odborné poradenství',
    description: 'Pomůžeme vám vybrat nejlepší řešení pro vaše specifické potřeby a rozpočet.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Kompletní montáž',
    description: 'Zajistíme profesionální pokládku včetně přípravných prací a finálních úprav.'
  }
];

export default function FlooringPage() {
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
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/slide_01.jpg"
            alt="Podlahy - základ každého interiéru"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Podlahy
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-amber-200 font-light">
            Základ každého interiéru
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Podlaha je základním prvkem každého interiéru – ovlivňuje nejen estetiku prostoru, 
            ale i jeho pohodlí, funkčnost a odolnost. Díky našim 20 letům zkušeností vám pomůžeme 
            vybrat ideální podlahu do bytu, rodinného domu, kanceláře i komerčních prostor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-700 hover:bg-red-800 px-8">
              Prohlédnout nabídku
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8">
              Nezávazná konzultace
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="m19 14-7 7m0 0-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Ať už hledáte teplý a útulný pocit dřeva, moderní design vinylových podlah, 
              nebo praktická řešení pro vysoce zatěžované prostory, u nás najdete to pravé. 
              Nabízíme široký sortiment podlahových krytin od renomovaných výrobců a zajistíme 
              také kompletní montáž, renovaci i odborné poradenství.
            </p>
          </div>
        </div>
      </section>

      {/* Flooring Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {flooringTypes.map((type, index) => (
              <div key={index} id={type.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} space-y-8`}>
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                      {type.title}
                    </h2>
                    <h3 className="text-xl text-red-700 font-medium mb-6">
                      {type.subtitle}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {type.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-4">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative group">
                    <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-700">
                      <Image
                        src={type.image}
                        alt={type.title}
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

      {/* Expertise Section */}
      <ExpertiseSection 
        title="20 let zkušeností ve službách vašeho domova"
        subtitle="Specializujeme se na kompletní řešení od návrhu až po finální realizaci. Každý projekt řešíme individuálně s ohledem na vaše potřeby a prostředí."
        features={expertiseFeatures}
        showStats={false}
      />

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/slide_01.jpg"
            alt="Kontaktujte nás"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-800/90 to-red-600/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nevíte si rady s výběrem?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Navštivte naši prodejnu, kde si můžete podlahy prohlédnout na vlastní oči 
            a poradit se s našimi specialisty!
          </p>
          <Link href="/kontakt">
            <Button size="lg" variant="secondary" className="bg-white text-red-700 hover:bg-gray-100 px-8 transform hover:scale-105 transition-all duration-300">
              Kontaktujte nás
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}