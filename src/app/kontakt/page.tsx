import type { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { ContactForm } from '@/components/sections/ContactForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
// import { TeamSection } from '@/components/sections/TeamSection';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { getImageUrl } from '@/config/cdn';

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktujte Podlahy Zapletal v Kroměříži. Telefon: +420 608 515 599, email: zapletal@podlahyzapletal.cz. Prodejna: Kotojedská 543, 767 01 Kroměříž. Odborné poradenství zdarma.",
  openGraph: {
    title: "Kontakt | Podlahy Zapletal Kroměříž",
    description: "Kontaktujte nás pro nezávaznou poptávku na pokládku podlah a dveří. Tel: +420 608 515 599. Prodejna v Kroměříži. Profesionální poradenství zdarma.",
    url: "https://podlahyzapletal.cz/kontakt",
    images: [
      {
        url: "https://storage.googleapis.com/podlahy-zapletal-images/optimized/IMG_4962_1200.webp",
        width: 1200,
        height: 630,
        alt: "Kontakt - Podlahy Zapletal Kroměříž",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <Layout>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Kontakt' }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl("Fotky_logo/IMG_4962.jpg")}
            alt="Kontakt - Podlahy Zapletal"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Kontakt
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-amber-200 font-light">
            Jsme tu pro vás v Kroměříži
          </p>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Spojte se s námi a domluvme si schůzku. Naš tým je připraven poradit vám s výběrem 
            nejlepšího řešení pro vaše podlahy a dveře.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="tel:+420608515599">
              <Button size="lg" className="bg-red-700 hover:bg-red-800 px-8 transform hover:scale-105 transition-all duration-300">
                Zavolat hned
              </Button>
            </a>
            <Link href="#kontaktni-informace">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 transform hover:scale-105 transition-all duration-300">
                Kontaktní údaje
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

      {/* Contact Info */}
      <section id="kontaktni-informace" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Kontaktní informace
            </h2>
            <div className="w-24 h-1 bg-red-700 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Company Info */}
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Podlahy, s.r.o.</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Prodejna</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Kotojedská 543<br />
                        767 01 Kroměříž
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Telefon</h4>
                      <p className="text-gray-600">
                        <a href="tel:+420608515599" className="hover:text-red-700 transition-colors text-lg font-medium">
                          +420 608 515 599
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">E-mail</h4>
                      <p className="text-gray-600">
                        <a href="mailto:zapletal@podlahyzapletal.cz" className="hover:text-red-700 transition-colors">
                          zapletal@podlahyzapletal.cz
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Details */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Firemní údaje</h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium">Sídlo firmy:</span> Na Sladovnách 1500/286, 767 01 Kroměříž</p>
                  <p><span className="font-medium">IČO:</span> 26980762</p>
                  <p><span className="font-medium">DIČ:</span> CZ26980762</p>
                  <p><span className="font-medium">Zapsáno:</span> Krajský soud v Brně, oddíl C, vložka 49687</p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Otevírací doba</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-red-200">
                    <span className="text-gray-700 font-medium">Pondělí - Pátek</span>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">9:00 - 12:00</div>
                      <div className="font-bold text-gray-900">12:30 - 17:00</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700 font-medium">Sobota - Neděle</span>
                    <span className="font-bold text-gray-500">Zavřeno</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/80 rounded-lg">
                  <p className="text-gray-800 text-center font-medium">
                    💡 <strong>Tip:</strong> Doporučujeme předem zavolat a domluvit si schůzku
                  </p>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-red-700 p-8 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">Rychlý kontakt</h3>
                <div className="space-y-4">
                  <a 
                    href="tel:+420608515599"
                    className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 p-4 rounded-lg transition-all duration-300 group"
                  >
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="font-medium">Zavolat hned</span>
                  </a>
                  
                  <a 
                    href="mailto:zapletal@podlahyzapletal.cz"
                    className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 p-4 rounded-lg transition-all duration-300 group"
                  >
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="font-medium">Napsat email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Jak nás najdete</h2>
            <p className="text-xl text-gray-600">Naše prodejna v Kroměříži</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2594.8542573676343!2d17.393847077024445!3d49.29791587135935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713c3c0b8c4b8b9%3A0x8b8c8c8c8c8c8c8c!2sKotojedsk%C3%A1%20543%2C%20767%2001%20Krom%C4%9B%C5%99%C3%AD%C5%BE!5e0!3m2!1scs!2scz!4v1699999999999!5m2!1scs!2scz&mode=embed&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Podlahy Zapletal - Kotojedská 543, Kroměříž"
                sandbox="allow-scripts allow-same-origin allow-popups"
              ></iframe>
            </div>
            
            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Adresa prodejny</h3>
                  <p className="text-gray-600">
                    Kotojedská 543<br />
                    767 01 Kroměříž
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Parkování</h3>
                  <p className="text-gray-600">
                    Možnost parkování přímo u prodejny<br />
                    <span className="text-green-600 font-medium">✓ Zdarma</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Skryto, dokud nebudou data */}
      {/* <TeamSection /> */}

      {/* Contact Form */}
      <div id="kontaktni-formular">
        <ContactForm />
      </div>

      {/* Service Area */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Oblast působnosti</h2>
          <p className="text-xl text-gray-600 mb-8">
            Poskytujeme služby v regionu Kroměříž a širokém okolí
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600 mb-8">
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors">Kroměříž</div>
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors">Hulín</div>
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors">Morkovice</div>
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors">Bystřice pod Hostýnem</div>
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors">Holešov</div>
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors">Přerov</div>
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors">Zlín</div>
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors">A další obce</div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl">
            <p className="text-blue-800 font-medium">
              📍 Nejste si jisti, zda k vám dojedeme? Zavolejte nám na <strong>+420 608 515 599</strong> a domluvíme se!
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}