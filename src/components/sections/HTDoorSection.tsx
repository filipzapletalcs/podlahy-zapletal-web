import React from 'react';
import Image from 'next/image';

interface HTDoor {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  securityClass: string;
  category: string;
  isUniversal?: boolean;
  features: string[];
  keyBenefits: string[];
}

interface HTDoorSectionProps {
  title: string;
  subtitle: string;
  doors: HTDoor[];
  sectionId?: string;
}

export const HTDoorSection: React.FC<HTDoorSectionProps> = ({
  title,
  subtitle,
  doors,
  sectionId
}) => {
  return (
    <section id={sectionId} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="space-y-24">
          {doors.map((door, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} space-y-8`}>
                <div>
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <h4 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {door.title}
                    </h4>
                    <span className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full">
                      Třída {door.securityClass}
                    </span>
                    {door.isUniversal ? (
                      <span className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full">
                        Byty i domy
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                        {door.category}
                      </span>
                    )}
                  </div>
                  <h5 className="text-xl text-red-700 font-medium mb-6">
                    {door.subtitle}
                  </h5>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {door.description}
                  </p>
                </div>

                {/* Technical Features */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h6 className="text-lg font-semibold text-gray-900 mb-4">Technické vlastnosti</h6>
                  <div className="space-y-3">
                    {door.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h6 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Vaše výhody
                  </h6>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {door.keyBenefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-200 rounded-full flex items-center justify-center mt-1 mr-3">
                          <svg className="w-3 h-3 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="relative group">
                  <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-700 bg-white">
                    <Image
                      src={door.image}
                      alt={door.title}
                      fill
                      className="object-contain object-center p-4"
                      style={{
                        objectPosition: 'center center'
                      }}
                    />
                    {/* Security Badge */}
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-lg z-10">
                      Třída {door.securityClass}
                    </div>
                    {door.isUniversal && (
                      <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-lg z-10">
                        Universal
                      </div>
                    )}
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 -z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};