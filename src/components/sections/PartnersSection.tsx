import React from 'react';

interface Partner {
  name: string;
  logo: string;
  category: string;
}

interface PartnersSectionProps {
  title: string;
  subtitle: string;
  partners: Partner[];
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ 
  title, 
  subtitle, 
  partners 
}) => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {title}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="group p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-16 flex items-center justify-center">
                {/* Placeholder for partner logo */}
                <div className="w-full h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm text-center px-2">
                    {partner.name}
                  </span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {partner.category}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Spolupracujeme s předními výrobci pro zajištění nejvyšší kvality
          </p>
        </div>
      </div>
    </section>
  );
};