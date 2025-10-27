import React from 'react';
import Image from 'next/image';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServicesOverviewProps {
  title: string;
  services: Service[];
  backgroundImage?: string;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  title,
  services,
  backgroundImage = "/slide_01.jpg"
}) => {
  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Naše služby"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-800/95 via-red-700/90 to-red-600/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4 relative">
            {title}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-white rounded-full"></div>
          </h2>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-700 to-red-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="w-6 h-6 text-white">
                    {service.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};