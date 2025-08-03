import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import BookingModal from './BookingModal';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const { t, currentLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isServicesDropdownOpen && !(event.target as Element).closest('.services-dropdown')) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServicesDropdownOpen]);

  const navItems = [
    { href: "#websites", label: t('nav.websites') },
    { href: "#apps", label: t('nav.apps') },
    { href: "#commerce", label: t('nav.commerce') },
    { href: "#booking", label: t('nav.booking') },
    { href: "#contact", label: t('nav.contact') }
  ];

  const servicesDropdownItems = [
    {
      category: t('nav.websites'),
      items: [
        { name: t('services.website.title'), description: t('services.website.description'), href: "#websites", price: "8,995 kr" },
        { name: "SEO & Analytics", description: "Optimering för sökmotorer", href: "#websites", price: "Ingår" }
      ]
    },
    {
      category: t('nav.commerce'),
      items: [
        { name: t('services.commerce.title'), description: t('services.commerce.description'), href: "#commerce", price: "10,995 kr" },
        { name: "Betalningar", description: "Stripe, Klarna, Swish", href: "#commerce", price: "Ingår" }
      ]
    },
    {
      category: t('nav.booking'),
      items: [
        { name: t('services.booking.title'), description: t('services.booking.description'), href: "#booking", price: "10,995 kr", popular: true },
        { name: "CRM & Analytics", description: "Kundhantering och rapporter", href: "#booking", price: "Ingår" }
      ]
    },
    {
      category: t('nav.apps'),
      items: [
        { name: t('services.complete.title'), description: "Komplett lösning med app", href: "#apps", price: "14,995 kr" },
        { name: "App Store", description: "Publicering i butiker", href: "#apps", price: "Extra" }
      ]
    }
  ];

  // Create full paths with language code
  const getFullPath = (path: string) => {
    const basePath = location.pathname.split('#')[0];
    if (path.startsWith('#')) {
      return `${basePath}${path}`;
    }
    return `/${currentLanguage.code}/${path.replace(/^\//, '')}`;
  };

  return (
    <>
      <motion.header 
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200/50' 
            : 'bg-white/90 backdrop-blur-lg shadow-lg'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-5">
            {/* Logo */}
            <div className="flex items-center">
              <Link to={`/${currentLanguage.code}/`}>
                <img 
                  src="/logo.jpg" 
                  alt="Axie Studio" 
                  className="h-10 sm:h-12 w-auto rounded-lg"
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Services Dropdown */}
              <div className="relative services-dropdown">
                <button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`px-4 py-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm xl:text-base font-medium flex items-center ${
                    isServicesDropdownOpen ? 'text-gray-900' : ''
                  }`}
                >
                  <span className="mr-2">{t('nav.services')}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${
                      isServicesDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Services Dropdown Menu */}
                <AnimatePresence>
                  {isServicesDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Header */}
                      <div className="p-6 border-b border-gray-100 bg-gray-50">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Våra Digitala Lösningar</h3>
                        <p className="text-sm text-gray-600">Välj den perfekta lösningen för ditt företag</p>
                      </div>
                      
                      {/* Services Grid */}
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-6">
                          {servicesDropdownItems.map((category, categoryIndex) => (
                            <div key={categoryIndex}>
                              <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                {category.category}
                              </h4>
                              <div className="space-y-3">
                                {category.items.map((item, itemIndex) => (
                                  <motion.a
                                    key={itemIndex}
                                    href={getFullPath(item.href)}
                                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                    onClick={() => setIsServicesDropdownOpen(false)}
                                  >
                                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0">
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <h5 className="font-semibold text-gray-900">
                                          {item.name}
                                          {item.popular && (
                                            <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                                              Populär
                                            </span>
                                          )}
                                        </h5>
                                        <span className="text-xs font-bold text-gray-600">{item.price}</span>
                                      </div>
                                      <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                  </motion.a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Footer CTA */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="bg-gray-900 rounded-xl p-4 text-white">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-bold mb-1">Osäker på vilket paket?</h4>
                                <p className="text-sm opacity-90">Boka en kostnadsfri konsultation</p>
                              </div>
                              <button
                                onClick={() => {
                                  setIsBookingModalOpen(true);
                                  setIsServicesDropdownOpen(false);
                                }}
                                className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
                              >
                                Boka tid
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Navigation Items */}
              {navItems.slice(0, 3).map((item, index) => (
                <a
                  key={item.href}
                  href={getFullPath(item.href)}
                  className="px-4 py-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm xl:text-base font-medium"
                >
                  {item.label}
                </a>
              ))}

              {/* Contact */}
              <a
                href={getFullPath("#contact")}
                className="px-4 py-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm xl:text-base font-medium"
              >
                {t('nav.contact')}
              </a>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <LanguageSwitcher />
              
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 text-sm"
              >
                {t('nav.bookTime')}
              </button>

              <a 
                href="https://app.axiestudio.se/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm"
              >
                {t('nav.login')}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <div
                    key="close"
                  >
                    <X size={24} className="text-gray-700" />
                  </div>
                ) : (
                  <div
                    key="menu"
                  >
                    <Menu size={24} className="text-gray-700" />
                  </div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <div
                className="lg:hidden py-6 border-t border-gray-200 max-h-[70vh] overflow-y-auto"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <nav className="flex flex-col space-y-3 px-2">
                  {/* Services Section in Mobile */}
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3 px-4">
                      {t('nav.services')}
                    </h3>
                    {servicesDropdownItems.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 px-4">
                          {category.category}
                        </h4>
                        {category.items.map((item, itemIndex) => (
                          <a
                            key={itemIndex}
                            href={getFullPath(item.href)}
                            className="flex items-center px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 rounded-lg font-medium touch-manipulation min-h-[48px] mb-2"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span>{item.name}</span>
                                <span className="text-xs font-bold text-gray-600">{item.price}</span>
                              </div>
                              {item.popular && (
                                <span className="text-xs text-orange-500 font-medium">Populär</span>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Other Navigation Items */}
                  <a
                    href={getFullPath("#contact")}
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 rounded-lg font-medium touch-manipulation min-h-[48px]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    {t('nav.contact')}
                  </a>
                  
                  <div className="px-4 py-2">
                    <LanguageSwitcher />
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsBookingModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center mt-4 touch-manipulation min-h-[48px]"
                  >
                    {t('nav.bookTime')}
                  </button>
                  
                  <a 
                    href="https://app.axiestudio.se/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center touch-manipulation min-h-[48px]"
                  >
                    {t('nav.login')}
                  </a>
                </nav>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </>
  );
};

export default Header;