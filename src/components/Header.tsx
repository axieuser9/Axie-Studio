import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, Heart, Sparkles, Calendar, ChevronDown, Globe, Smartphone, ShoppingCart, Calendar as CalendarIcon, Zap, Star } from 'lucide-react';
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
    { href: "#websites", label: t('nav.websites'), icon: Globe },
    { href: "#apps", label: t('nav.apps'), icon: Smartphone },
    { href: "#commerce", label: t('nav.commerce'), icon: ShoppingCart },
    { href: "#booking", label: t('nav.booking'), icon: CalendarIcon },
    { href: "#contact", label: t('nav.contact'), icon: Heart }
  ];

  const servicesDropdownItems = [
    {
      category: t('nav.websites'),
      items: [
        { name: t('services.website.title'), description: t('services.website.description'), href: "#websites", icon: Globe, price: "8,995 kr" },
        { name: "SEO & Analytics", description: "Optimering för sökmotorer", href: "#websites", icon: Star, price: "Ingår" }
      ]
    },
    {
      category: t('nav.commerce'),
      items: [
        { name: t('services.commerce.title'), description: t('services.commerce.description'), href: "#commerce", icon: ShoppingCart, price: "10,995 kr" },
        { name: "Betalningar", description: "Stripe, Klarna, Swish", href: "#commerce", icon: Zap, price: "Ingår" }
      ]
    },
    {
      category: t('nav.booking'),
      items: [
        { name: t('services.booking.title'), description: t('services.booking.description'), href: "#booking", icon: CalendarIcon, price: "10,995 kr", popular: true },
        { name: "CRM & Analytics", description: "Kundhantering och rapporter", href: "#booking", icon: Star, price: "Ingår" }
      ]
    },
    {
      category: t('nav.apps'),
      items: [
        { name: t('services.complete.title'), description: "Komplett lösning med app", href: "#apps", icon: Smartphone, price: "14,995 kr" },
        { name: "App Store", description: "Publicering i butiker", href: "#apps", icon: Star, price: "Extra" }
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
            <motion.div 
              className="flex items-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link to={`/${currentLanguage.code}/`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  <img 
                    src="/logo.jpg" 
                    alt="Axie Studio" 
                    className="relative h-10 sm:h-12 w-auto transition-all duration-300 group-hover:brightness-110 rounded-lg"
                  />
                </div>
              </Link>
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Services Dropdown */}
              <div className="relative services-dropdown">
                <motion.button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`group relative px-4 py-3 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-sm xl:text-base font-semibold overflow-hidden flex items-center ${
                    isServicesDropdownOpen ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50' : ''
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-xl" />
                  <span className="relative mr-2">{t('nav.services')}</span>
                  <ChevronDown 
                    size={16} 
                    className={`relative transition-transform duration-300 ${
                      isServicesDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"
                  />
                </motion.button>

                {/* Services Dropdown Menu */}
                <AnimatePresence>
                  {isServicesDropdownOpen && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-[800px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Header */}
                      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
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
                                    className="group flex items-start p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    onClick={() => setIsServicesDropdownOpen(false)}
                                  >
                                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                                      <item.icon className="text-white" size={18} />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <h5 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                          {item.name}
                                          {item.popular && (
                                            <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2 py-1 rounded-full">
                                              Populär
                                            </span>
                                          )}
                                        </h5>
                                        <span className="text-xs font-bold text-blue-600">{item.price}</span>
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
                          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl p-4 text-white">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-bold mb-1">Osäker på vilket paket?</h4>
                                <p className="text-sm opacity-90">Boka en kostnadsfri konsultation</p>
                              </div>
                              <motion.button
                                onClick={() => {
                                  setIsBookingModalOpen(true);
                                  setIsServicesDropdownOpen(false);
                                }}
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Calendar className="mr-2" size={16} />
                                Boka tid
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Navigation Items */}
              {navItems.slice(0, 3).map((item, index) => (
                <motion.a
                  key={item.href}
                  href={getFullPath(item.href)}
                  className="group relative px-4 py-3 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-sm xl:text-base font-semibold overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-xl" />
                  <span className="relative">{item.label}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"
                  />
                </motion.a>
              ))}

              {/* Contact */}
              <motion.a
                href={getFullPath("#contact")}
                className="group relative px-4 py-3 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-sm xl:text-base font-semibold overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-xl" />
                <span className="relative">{t('nav.contact')}</span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"
                />
              </motion.a>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <LanguageSwitcher />
              
              <motion.button
                onClick={() => setIsBookingModalOpen(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-500 flex items-center text-sm shadow-lg hover:shadow-glow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Calendar className="mr-2 relative z-10" size={16} />
                <span className="relative z-10">{t('nav.bookTime')}</span>
              </motion.button>

              <motion.a 
                href="https://app.axiestudio.se/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 flex items-center text-sm shadow-lg hover:shadow-glow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Heart className="mr-2 relative z-10 animate-pulse" size={16} />
                <span className="relative z-10">{t('nav.login')}</span>
                <ExternalLink className="ml-2 group-hover:translate-x-1 group-hover:scale-110 transition-all relative z-10" size={16} />
                <Sparkles className="absolute top-1 right-1 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 glass-card"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="lg:hidden py-6 border-t border-white/30 max-h-[70vh] overflow-y-auto"
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
                          <motion.a
                            key={itemIndex}
                            href={getFullPath(item.href)}
                            className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-xl font-semibold glass-card touch-manipulation min-h-[48px] mb-2"
                            onClick={() => setIsMenuOpen(false)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (categoryIndex * 2 + itemIndex) * 0.1, type: "spring" }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <item.icon className="mr-3 text-blue-500" size={20} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span>{item.name}</span>
                                <span className="text-xs font-bold text-blue-600">{item.price}</span>
                              </div>
                              {item.popular && (
                                <span className="text-xs text-orange-500 font-medium">Populär</span>
                              )}
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Other Navigation Items */}
                  <motion.a
                    href={getFullPath("#contact")}
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-xl font-semibold glass-card touch-manipulation min-h-[48px]"
                    onClick={() => setIsMenuOpen(false)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Heart className="mr-3 text-blue-500" size={20} />
                    {t('nav.contact')}
                  </motion.a>
                  
                  <div className="px-4 py-2">
                    <LanguageSwitcher />
                  </div>
                  
                  <motion.button
                    onClick={() => {
                      setIsBookingModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-500 flex items-center justify-center mt-4 shadow-lg touch-manipulation min-h-[48px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calendar className="mr-2" size={18} />
                    {t('nav.bookTime')}
                  </motion.button>
                  
                  <motion.a 
                    href="https://app.axiestudio.se/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 flex items-center justify-center shadow-lg touch-manipulation min-h-[48px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, type: "spring" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Heart className="mr-2 animate-pulse" size={18} />
                    {t('nav.login')}
                    <ExternalLink className="ml-2" size={18} />
                  </motion.a>
                </nav>
              </motion.div>
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