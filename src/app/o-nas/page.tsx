import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { About } from '@/components/sections/About';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { ValuesSection } from '@/components/sections/ValuesSection';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { getImageUrl } from '@/config/cdn';

export const metadata: Metadata = {
  title: "O nás",
  description: "Podlahy Zapletal - rodinná firma s více než 20letou tradicí v Kroměříži. Specializujeme se na prodej, montáž a renovaci podlah i dveří. Naše hodnoty: kvalita, spolehlivost a individuální přístup.",
  openGraph: {
    title: "O nás | Podlahy Zapletal - 20 let zkušeností v Kroměříži",
    description: "Rodinná firma s více než 20letou tradicí. Specializujeme se na prodej, montáž a renovaci podlah i dveří. Kvalita, spolehlivost a individuální přístup.",
    url: "https://podlahyzapletal.cz/o-nas",
    images: [
      {
        url: "https://storage.googleapis.com/podlahy-zapletal-images/optimized/PXL_20250117_140905991_1200.webp",
        width: 1200,
        height: 630,
        alt: "O firmě Podlahy Zapletal",
      },
    ],
  },
};

// Data pro sekci služeb
const ourServices = [
  {
    title: 'Prodej a montáž podlah a dveří',
    description: 'Kompletní služby od výběru materiálu až po finální instalaci',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: 'Renovace podlah',
    description: 'Profesionální broušení, lakování a olejování pro obnovu vašich podlah',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'Odborné poradenství a návrh řešení',
    description: 'Náš technik přijede na místo, navrhne optimální variantu a vypracuje cenovou nabídku zdarma',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

// Data pro sekci hodnot
const ourValues = [
  {
    title: 'Kvalita',
    description: 'Používáme pouze ověřené materiály a postupy, které zaručují dlouhodobou spokojenost našich klientů.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    )
  },
  {
    title: 'Spolehlivost',
    description: 'Dodržujeme domluvené termíny a závazky. Na naši práci se můžete spolehnout.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    title: 'Péče o klienta',
    description: 'Každý projekt řešíme individuálně s ohledem na potřeby a přání klienta.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  }
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl("Fotky_logo/IMG_2255.jpg")}
            alt="O naší firmě"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            O nás
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-amber-200 font-light">
            Více než 20 let zkušeností v oboru
          </p>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Poznejte naši firmu, náš přístup k práci a proč si nás vybrat 
            pro realizaci vašich podlah a dveří. Specializujeme se na kompletní řešení od návrhu až po finální realizaci.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/kontakt">
              <Button size="lg" className="bg-red-700 hover:bg-red-800 px-8 transform hover:scale-105 transition-all duration-300">
                Kontaktujte nás
              </Button>
            </Link>
            <Link href="/galerie">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 transform hover:scale-105 transition-all duration-300">
                Naše realizace
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

      {/* About Section */}
      <About />

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Náš příběh a zkušenosti
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Na trhu působíme již přes <strong>20 let</strong>, během nichž jsme nasbírali bohaté zkušenosti s prodejem a 
                montáží podlah i dveří. Naším hlavním cílem je spokojenost klienta a individuální přístup ke 
                každému projektu.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Kromě podlah se specializujeme i na interiérové a vchodové dveře, které dokonale sladíme s 
                vaším interiérem. Poskytujeme také podlahovou chemii pro údržbu specifických povrchů, aby 
                vaše podlaha zůstala dlouhodobě krásná a odolná.
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={getImageUrl("Fotky_logo/PXL_20250117_140905991.jpg")}
                  alt="Naše realizace"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Overview Section */}
      <ServicesOverview 
        title="Co pro vás zajistíme?"
        services={ourServices}
        backgroundImage={getImageUrl("Fotky_logo/IMG_4967.jpg")}
      />


      {/* Values Section */}
      <ValuesSection 
        title="Naše hodnoty"
        subtitle="Co nás definuje a řídí naši práci"
        values={ourValues}
      />
    </Layout>
  );
}