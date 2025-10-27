'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FastImage } from '@/components/ui/FastImage';
import { handleAnchorClick } from '@/utils/smoothScroll';

const navigation = [
  { name: 'Domů', href: '/' },
  { name: 'O nás', href: '/o-nas' },
  { 
    name: 'Podlahy', 
    href: '/podlahy',
    dropdown: [
      { name: 'Dřevěné podlahy', href: '/podlahy#drevene-podlahy' },
      { name: 'Vinylové podlahy', href: '/podlahy#vinylove-podlahy' },
      { name: 'Laminátové podlahy', href: '/podlahy#laminatove-podlahy' },
      { name: 'Korkové podlahy', href: '/podlahy#korkove-podlahy' },
      { name: 'PVC podlahy', href: '/podlahy#pvc-podlahy' },
      { name: 'Koberce', href: '/podlahy#koberce' }
    ]
  },
  { 
    name: 'Dveře', 
    href: '/dvere',
    dropdown: [
      { name: 'Vchodové dveře', href: '/dvere#vchodove-dvere' },
      { name: 'Interiérové dveře', href: '/dvere#interierove-dvere' }
    ]
  },
  { 
    name: 'Služby', 
    href: '/sluzby',
    dropdown: [
      { name: 'Prodej a montáž podlah', href: '/sluzby#prodej-montaz-podlah' },
      { name: 'Prodej a montáž dveří', href: '/sluzby#prodej-montaz-dveri' },
      { name: 'Renovace a údržba podlah', href: '/sluzby#renovace-udrzba-podlah' },
      { name: 'Podlahová chemie', href: '/sluzby#podlahova-chemie' }
    ]
  },
  { name: 'Galerie', href: '/galerie' },
  { name: 'Virtuální prohlídka', href: '/virtualni-prohlidka' },
  { name: 'Kontakt', href: '/kontakt' }
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPodlahyDropdown, setShowPodlahyDropdown] = useState(false);
  const [showDvereDropdown, setShowDvereDropdown] = useState(false);
  const [showSluzbyDropdown, setShowSluzbyDropdown] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState<{[key: string]: boolean}>({
    'Podlahy': false,
    'Dveře': false,
    'Služby': false
  });

  const toggleMobileDropdown = (itemName: string) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  return (
    <header 
      className="bg-white shadow-lg sticky top-0 z-50 relative"
      onMouseLeave={() => {
        setShowPodlahyDropdown(false);
        setShowDvereDropdown(false);
        setShowSluzbyDropdown(false);
      }}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <FastImage
                src="Fotky_logo/Logo_podlahy_red.png"
                alt="Podlahy Zapletal"
                width={120}
                height={30}
                className="h-6 w-auto max-h-6 object-contain"
                priority={true}
              />
            </Link>

            {/* Desktop Navigation - full menu do 1200px */}
            <div className="hidden min-[1200px]:flex space-x-6">
              {navigation.map((item) => (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.name === 'Podlahy') {
                      setShowPodlahyDropdown(true);
                      setShowDvereDropdown(false);
                      setShowSluzbyDropdown(false);
                    } else if (item.name === 'Dveře') {
                      setShowDvereDropdown(true);
                      setShowPodlahyDropdown(false);
                      setShowSluzbyDropdown(false);
                    } else if (item.name === 'Služby') {
                      setShowSluzbyDropdown(true);
                      setShowPodlahyDropdown(false);
                      setShowDvereDropdown(false);
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-red-700 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                  >
                    {item.name}
                    {item.dropdown && (
                      <svg 
                        className="ml-1 h-4 w-4 transition-transform duration-300" 
                        style={{ transform: (showPodlahyDropdown && item.name === 'Podlahy') || (showDvereDropdown && item.name === 'Dveře') || (showSluzbyDropdown && item.name === 'Služby') ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                </div>
              ))}
            </div>


            {/* CTA Button */}
            <div className="hidden min-[1200px]:block">
              <Link href="/kontakt#kontaktni-formular">
                <Button size="sm">
                  Nezávazná poptávka
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="max-[1199px]:inline-flex hidden items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-700"
            >
              <span className="sr-only">Otevřít hlavní menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Podlahy Dropdown Bar */}
        {showPodlahyDropdown && (
          <div 
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50"
            onMouseEnter={() => setShowPodlahyDropdown(true)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex flex-wrap justify-center gap-8">
                {navigation.find(item => item.name === 'Podlahy')?.dropdown?.map((dropdownItem) => (
                  <Link
                    key={dropdownItem.name}
                    href={dropdownItem.href}
                    className="text-gray-900 hover:text-red-700 text-sm font-medium transition-colors duration-200 py-1"
                    onClick={(e) => {
                      if (handleAnchorClick(dropdownItem.href)) {
                        e.preventDefault();
                      }
                      setShowPodlahyDropdown(false);
                    }}
                  >
                    {dropdownItem.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dveře Dropdown Bar */}
        {showDvereDropdown && (
          <div 
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50"
            onMouseEnter={() => setShowDvereDropdown(true)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex flex-wrap justify-center gap-8">
                {navigation.find(item => item.name === 'Dveře')?.dropdown?.map((dropdownItem) => (
                  <Link
                    key={dropdownItem.name}
                    href={dropdownItem.href}
                    className="text-gray-900 hover:text-red-700 text-sm font-medium transition-colors duration-200 py-1"
                    onClick={(e) => {
                      if (handleAnchorClick(dropdownItem.href)) {
                        e.preventDefault();
                      }
                      setShowDvereDropdown(false);
                    }}
                  >
                    {dropdownItem.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Služby Dropdown Bar */}
        {showSluzbyDropdown && (
          <div 
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50"
            onMouseEnter={() => setShowSluzbyDropdown(true)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex flex-wrap justify-center gap-6">
                {navigation.find(item => item.name === 'Služby')?.dropdown?.map((dropdownItem) => (
                  <Link
                    key={dropdownItem.name}
                    href={dropdownItem.href}
                    className="text-gray-900 hover:text-red-700 text-sm font-medium transition-colors duration-200 py-1"
                    onClick={(e) => {
                      if (handleAnchorClick(dropdownItem.href)) {
                        e.preventDefault();
                      }
                      setShowSluzbyDropdown(false);
                    }}
                  >
                    {dropdownItem.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="max-[1199px]:block hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navigation.map((item) => (
                <div key={item.name}>
                  {/* Main navigation item */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-red-700 block px-3 py-2 text-base font-medium flex-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    
                    {/* Dropdown arrow for items with dropdowns */}
                    {item.dropdown && (
                      <button
                        onClick={() => toggleMobileDropdown(item.name)}
                        className="px-3 py-2 text-gray-500 hover:text-red-700"
                      >
                        <svg 
                          className="w-5 h-5 transition-transform duration-300" 
                          style={{ transform: mobileDropdowns[item.name] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {/* Dropdown items */}
                  {item.dropdown && mobileDropdowns[item.name] && (
                    <div className="pl-6 space-y-1 border-l-2 border-red-100 ml-3">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="text-gray-600 hover:text-red-700 block px-3 py-2 text-sm"
                          onClick={(e) => {
                            if (handleAnchorClick(dropdownItem.href)) {
                              e.preventDefault();
                            }
                            setIsMenuOpen(false);
                            setMobileDropdowns({ 'Podlahy': false, 'Dveře': false, 'Služby': false });
                          }}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-3 py-2">
                <Link href="/kontakt#kontaktni-formular">
                  <Button size="sm" className="w-full">
                    Nezávazná poptávka
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
    </header>
  );
};