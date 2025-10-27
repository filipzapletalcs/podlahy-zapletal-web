'use client';

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggeredCards } from '@/components/animations/StaggeredCards';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  email?: string;
  phone?: string;
  photo?: string;
  description?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 'libor-zapletal',
    name: 'Libor Zapletal',
    position: 'Majitel firmy',
    email: 'zapletal@podlahyzapletal.cz',
    phone: '+420 608 515 599',
    description: 'S více než 20letými zkušenostmi v oboru podlah vede firmu s důrazem na kvalitu a spokojenost zákazníků.'
  },
  {
    id: 'katerina-zapletalova',
    name: 'Kateřina Zapletalová',
    position: 'Manažerka prodeje',
    email: 'katerina@podlahyzapletal.cz',
    description: 'Stará se o komunikaci se zákazníky a koordinaci zakázek. Poradí vám s výběrem nejvhodnějšího řešení.'
  },
  {
    id: 'jakub-vavra',
    name: 'Jakub Vávra',
    position: 'Produktový specialista',
    email: 'jakub@podlahyzapletal.cz',
    description: 'Odborník na materiály a technologie. Zodpovědný za technické poradenství a výběr optimálních řešení.'
  },
  {
    id: 'team-member-4',
    name: 'Člen týmu',
    position: 'Pozice bude upřesněna',
    description: 'Detaily budou doplněny později.'
  }
];

export const TeamSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Náš tým
            </h2>
            <div className="w-24 h-1 bg-red-700 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Poznejte náš tým odborníků, kteří se postarají o realizaci vašich snů o krásných podlahách a dveřích.
            </p>
          </div>
        </ScrollReveal>

        <StaggeredCards 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" 
          staggerDelay={0.1}
        >
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Photo placeholder */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
                
                {/* Overlay s kontaktními informacemi */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="block text-sm hover:text-amber-200 transition-colors mb-1"
                      >
                        📧 {member.email}
                      </a>
                    )}
                    {member.phone && (
                      <a 
                        href={`tel:${member.phone}`}
                        className="block text-sm hover:text-amber-200 transition-colors"
                      >
                        📞 {member.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Informace */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-red-700 font-medium mb-3">
                  {member.position}
                </p>
                {member.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                )}

                {/* Kontaktní tlačítka */}
                <div className="mt-4 flex space-x-2">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex-1 bg-red-700 hover:bg-red-800 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-300 text-center"
                    >
                      Email
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-2 px-3 rounded-lg transition-colors duration-300 text-center"
                    >
                      Volat
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </StaggeredCards>

        {/* CTA sekce */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Máte otázky? Rádi vám pomůžeme!
              </h3>
              <p className="text-gray-600 mb-6">
                Náš tým je připraven odpovědět na všechny vaše dotazy a najít pro vás to nejlepší řešení.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+420608515599"
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Zavolat hned
                </a>
                <a
                  href="mailto:zapletal@podlahyzapletal.cz"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Napsat email
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};