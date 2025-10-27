'use client';

import { Layout } from '@/components/layout/Layout';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { getImageUrl } from '@/config/cdn';
import { useEffect } from 'react';
import { smoothScrollToElement } from '@/utils/smoothScroll';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { HTDoorSection } from '@/components/sections/HTDoorSection';

const interiorDoorTypes = [
  {
    title: 'Falcové dveře',
    subtitle: 'Tradiční elegance s dokonalým těsněním',
    description: 'Tradiční provedení s přesahem hrany dveřního křídla přes zárubeň, zajišťující lepší těsnění a akustický komfort.',
    image: '/Fotky_logo/IMG_2254.jpg',
    features: [
      'Lepší těsnění a zvuková izolace',
      'Tradiční a ověřené řešení', 
      'Široký výběr materiálů a povrchových úprav'
    ]
  },
  {
    title: 'Bezfalcové dveře',
    subtitle: 'Moderní minimalismus v dokonalé formě',
    description: 'Moderní řešení se skrytými panty, které perfektně lícují se zárubní a působí minimalisticky. Ideální pro současné interiéry.',
    image: '/Fotky_logo/IMG_4942.jpg',
    features: [
      'Čisté linie a minimalistický design',
      'Skryté panty pro elegantní vzhled',
      'Perfektní soulad s moderními interiéry'
    ]
  },
  {
    title: 'Posuvné dveře',
    subtitle: 'Úspora prostoru s designovým přesahem',
    description: 'Ideální do menších prostor, kde šetří místo. Mohou být posuvné po stěně nebo do stavebního pouzdra s elegantním designem.',
    image: '/Fotky_logo/PXL_20250117_140905991.jpg',
    features: [
      'Maximální úspora prostoru',
      'Možnost skrytí do stavebního pouzdra',
      'Moderní a funkční řešení'
    ]
  },
  {
    title: 'Skleněné dveře',
    subtitle: 'Světlo a prostor ve vašem domově',
    description: 'Elegantní a nadčasové, přinášejí více světla do interiéru a opticky zvětšují prostor. Různé typy skel a rámů.',
    image: '/Fotky_logo/IMG_2255.jpg',
    features: [
      'Více přirozeného světla v prostoru',
      'Optické zvětšení prostoru',
      'Variety bezpečnostních skel'
    ]
  },
  {
    title: 'Dveře s dřevěnou dýhou',
    subtitle: 'Přírodní krása autentického dřeva',
    description: 'Přírodní vzhled s vysokou odolností, vhodné pro ty, kteří preferují teplé a autentické materiály s jedinečnou strukturou.',
    image: '/Fotky_logo/IMG_4943.jpg',
    features: [
      'Autentická krása přírodního dřeva',
      'Jedinečná struktura každého kusu',
      'Vysoká odolnost a dlouhověkost'
    ]
  },
  {
    title: 'Lakované dveře',
    subtitle: 'Sofistikovaný lesk pro luxusní interiéry',
    description: 'Stylové řešení v matném nebo lesklém laku, které dodá interiéru sofistikovaný vzhled a snadnou údržbu.',
    image: '/Fotky_logo/IMG_2256.jpg',
    features: [
      'Leskle nebo matně lakované povrchy',
      'Snadná údržba a čištění',
      'Široká paleta barev'
    ]
  }
];

// HT dveře do bytů
const htApartmentDoors = [
  {
    title: 'HT Premium',
    subtitle: 'Nejoblíbenější bezpečnostní dveře do bytů',
    description: 'Spolehlivá ochrana za výhodnou cenu. Ideální pro panelové a cihlové domy s požadavky na základní bezpečnost a akustický komfort.',
    image: '/HT_fotky/dvere-premium.jpeg',
    securityClass: '3',
    category: 'Do bytů',
    features: [
      'Bezpečnostní třída 3 (certifikovaná)',
      'Protihluková izolace 28 dB',
      'Dvojité těsnění pro lepší izolaci',
      '14 zamykacích bodů',
      'Tloušťka křídla 56 mm'
    ],
    keyBenefits: [
      'Včetně kompletní montáže',
      'Odvoz starých dveří zdarma',
      'Vhodné pro panelové i cihlové domy',
      'Nejlepší poměr cena/výkon'
    ]
  },
  {
    title: 'HT Magnum',
    subtitle: 'Prémiové dveře s protipožární ochranou',
    description: 'Vynikající akustické vlastnosti a protipožární ochrana EI 30. Maximální komfort a bezpečnost pro náročné zákazníky.',
    image: '/HT_fotky/svetly-orech_magnum.png',
    securityClass: '3',
    category: 'Do bytů',
    features: [
      'Bezpečnostní třída 3 + protipožární EI 30',
      'Výjimečná protihluková izolace 44 dB',
      'Centrální rozvorový zámek',
      'Přídavný zámek pro extra bezpečnost',
      'Dřevohlíníkový práh'
    ],
    keyBenefits: [
      'Protipožární kukátko v ceně',
      'Nejvyšší akustický komfort',
      'Dvojité zabezpečení',
      'Profesionální montáž'
    ]
  },
  {
    title: 'HT Magnum EXT',
    subtitle: 'Univerzální dveře pro byty i pavlačové domy',
    description: 'Kombinace protipožární ochrany s tepelnou izolací. Ideální pro pavlačové domy a byty s požadavky na tepelný komfort.',
    image: '/HT_fotky/magnum_ext_venkovni_strana.jpeg',
    securityClass: '3',
    category: 'Byty i domy',
    isUniversal: true,
    features: [
      'Bezpečnostní třída 3 + protipožární EI 30',
      'Tepelná izolace U = 1,5 - 1,6 W/m²K',
      'Protihluková izolace 44 dB',
      '14 zamykacích bodů',
      'Tloušťka křídla 56 mm'
    ],
    keyBenefits: [
      'Vhodné pro pavlačové domy',
      'Kombinace bezpečnosti a tepelné izolace',
      'Dvojité těsnění',
      'Kompletní montáž včetně demontáže'
    ]
  }
];

// HT dveře do rodinných domů
const htHouseDoors = [
  {
    title: 'HT Perfect 68XL',
    subtitle: 'Energeticky úsporné dveře do rodinných domů',
    description: 'Kombinace bezpečnosti s vynikající tepelnou izolací. Ideální pro rodinné domy s důrazem na energetickou úspornost a moderní design.',
    image: '/HT_fotky/Perfect 68XL.jpeg',
    securityClass: '3',
    category: 'Do domů',
    features: [
      'Bezpečnostní třída 3 pro rodinné domy',
      'Tepelná izolace U = 1,0 - 1,5 W/m²K',
      'Protihluková izolace 29 dB',
      'Tloušťka křídla 69 mm',
      '13 zamykacích bodů'
    ],
    keyBenefits: [
      'Úspora nákladů na vytápění',
      'Možnost proskleného provedení',
      'Moderní design pro domy',
      'Záruka až 10 let'
    ]
  },
  {
    title: 'HT Special',
    subtitle: 'Cenově dostupné řešení pro rodinné domy',
    description: 'Kvalitní bezpečnostní dveře s dobrou tepelnou izolací za příznivou cenu. Ideální pro rodinné domy s rozpočtovými požadavky.',
    image: '/HT_fotky/special.jpeg',
    securityClass: '3',
    category: 'Do domů',
    features: [
      'Bezpečnostní třída 3 (certifikovaná)',
      'Tepelná izolace Ud = 0,89 - 1,1 W/m²K',
      'Protihluková izolace 28 dB',
      'Tloušťka křídla 69 mm',
      '5 zamykacích bodů'
    ],
    keyBenefits: [
      'Výhodná cena pro rodinné domy',
      'Možnost proskleného provedení',
      'Kompletní montáž a demontáž',
      'Široký výběr barevných dekorů'
    ]
  }
];

// Features pro sekci zkušeností u dveří
const doorExpertiseFeatures = [
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: 'Kvalitní materiály',
    description: 'Používáme pouze ověřené materiály od renomovaných výrobců pro dlouhou životnost.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Profesionální montáž',
    description: 'Zajistíme precizní montáž včetně zárubní a všech potřebných úprav.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Individuální přístup',
    description: 'Každý projekt řešíme podle specifických potřeb a požadavků klienta.'
  }
];

export default function DoorsPage() {
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
            src={getImageUrl("Fotky_logo/IMG_2254.jpg")}
            alt="Dveře - stylový prvek interiéru"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Dveře
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-amber-200 font-light">
            Stylový prvek, který dotváří váš interiér
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Dveře nejsou jen praktickým prvkem, ale také výrazným designovým prvkem každého interiéru. 
            Správně zvolené dveře dokáží prostor opticky zvětšit, zlepšit jeho funkčnost a dodat mu jedinečný charakter.
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
              V naší nabídce najdete široký výběr interiérových i vchodových dveří, které spojují kvalitu, 
              odolnost a moderní design. Nabízíme dveře různých materiálů, barev a provedení, včetně 
              možností posuvných, bezfalcových nebo skleněných variant.
            </p>
          </div>
        </div>
      </section>

      {/* Interior Doors Section */}
      <section id="interierove-dvere" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Interiérové dveře
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jaké provedení interiérových dveří nabízíme?
            </p>
          </div>

          <div className="space-y-32">
            {interiorDoorTypes.map((type, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} space-y-8`}>
                  <div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-3">
                      {type.title}
                    </h3>
                    <h4 className="text-xl text-red-700 font-medium mb-6">
                      {type.subtitle}
                    </h4>
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

      {/* HT Doors Hero */}
      <section id="vchodove-dvere" className="relative py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl("Fotky_logo/IMG_4964.jpg")}
            alt="HT bezpečnostní dveře"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
              <span className="text-amber-200 font-semibold">Autorizovaný prodejce</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            HT bezpečnostní dveře
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-amber-200 font-light">
            Nejoblíbenější bezpečnostní dveře českých domácností
          </p>
          <p className="text-lg leading-relaxed opacity-90 max-w-4xl mx-auto mb-8">
            Jako autorizovaný prodejce HT dveří vám nabízíme kompletní řadu bezpečnostních dveří 
            s certifikovanou odolností proti vloupání, profesionální montáž a dlouhodobý servis.
          </p>
          
          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Bezpečnostní třída 3</h3>
              <p className="text-sm opacity-80">Certifikovaná ochrana proti vloupání</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Profesionální montáž</h3>
              <p className="text-sm opacity-80">Certifikovaní technici HT</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Až 10letá záruka</h3>
              <p className="text-sm opacity-80">Kompletní servis a podpora</p>
            </div>
          </div>
        </div>
      </section>

      {/* HT Apartment Doors */}
      <HTDoorSection
        title="HT dveře do bytů"
        subtitle="Certifikované bezpečnostní dveře pro panelové a cihlové domy"
        doors={htApartmentDoors}
        sectionId="ht-byty"
      />

      {/* Separator */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="border-t border-gray-200 pt-8">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-6 py-3">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0-7-7m7 7V3" />
              </svg>
              <span className="text-gray-600 font-medium">Dveře do rodinných domů</span>
            </div>
          </div>
        </div>
      </section>

      {/* HT House Doors */}
      <HTDoorSection
        title="HT dveře do rodinných domů"
        subtitle="Energeticky úsporné bezpečnostní dveře s vynikající tepelnou izolací"
        doors={htHouseDoors}
        sectionId="ht-domy"
      />

      {/* Expertise Section */}
      <ExpertiseSection 
        title="10 let zkušeností s dveřmi všech typů"
        subtitle="Specializujeme se na kompletní řešení od návrhu až po finální montáž. Každý projekt řešíme individuálně s ohledem na vaše potřeby a styl bydlení."
        features={doorExpertiseFeatures}
        showStats={false}
      />

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl("Fotky_logo/IMG_4962.jpg")}
            alt="Kontaktujte nás"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-800/90 to-red-600/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nejste si jisti, které dveře jsou pro vás nejlepší?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rádi vám pomůžeme s výběrem a doporučíme nejvhodnější variantu pro váš interiér. 
            Navštivte náš showroom v Kroměříži a prohlédněte si vzorky na vlastní oči!
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