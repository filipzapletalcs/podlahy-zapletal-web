import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  'Dřevěné podlahy',
  'Vinylové podlahy',
  'Laminátové podlahy',
  'Korkové podlahy',
  'PVC koberce',
  'Interiérové dveře'
];

const quickLinks = [
  { name: 'O nás', href: '/o-nas' },
  { name: 'Služby', href: '/sluzby' },
  { name: 'Galerie', href: '/galerie' },
  { name: 'Reference', href: '/reference' },
  { name: 'Kontakt', href: '/kontakt' }
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Image
              src="/Logo_podlahy.png"
              alt="Podlahy Zapletal"
              width={200}
              height={60}
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 mb-4 max-w-md">
              Specializujeme se na pokládku a renovaci všech typů podlah. 
              Díky více než 20letým zkušenostem vám garantujeme kvalitu a profesionální přístup.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Kotojedská 543, 767 01 Kroměříž
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +420 608 515 599
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                zapletal@podlahyzapletal.cz
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Naše služby</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/sluzby" className="text-gray-300 hover:text-white transition-colors text-sm">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rychlé odkazy</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Podlahy, s.r.o. Všechna práva vyhrazena. IČO: 26980762
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/ochrana-udaju" className="text-gray-400 hover:text-white text-sm transition-colors">
                Ochrana údajů
              </Link>
              <Link href="/obchodni-podminky" className="text-gray-400 hover:text-white text-sm transition-colors">
                Obchodní podmínky
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};