import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, MessageCircle, Phone, Menu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import BookingModal from './BookingModal';
import EmbeddedChatbot from './EmbeddedChatbot';

const BottomNavigation: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navItems = [
    {
      id: 'home',
      icon: Home,
      label: t('nav.home', {}, 'Hem'),
      action: () => {
        setActiveTab('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'booking',
      icon: Calendar,
      label: t('nav.booking', {}, 'Boka'),
      action: () => {
        setActiveTab('booking');
        setIsBookingModalOpen(true);
      }
    },
    {
      id: 'chat',
      icon: MessageCircle,
      label: t('nav.chat', {}, 'Chat'),
      action: () => {
        setActiveTab('chat');
        setIsChatOpen(true);
      }
    },
    {
      id: 'contact',
      icon: Phone,
      label: t('nav.contact', {}, 'Kontakt'),
      action: () => {
        setActiveTab('contact');
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'menu',
      icon: Menu,
      label: t('nav.menu', {}, 'Meny'),
      action: () => {
        setActiveTab('menu');
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  return (
    <>
      {/* Bottom Navigation - Mobile and Tablet only */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden">
        {/* Background with blur effect */}
        <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={item.action}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 min-w-[60px] ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
               aria-label={t('nav.chat', {}, 'Chat')}
              >
                <item.icon 
                  size={20} 
                  className={`mb-1 ${
                    activeTab === item.id ? 'text-white' : ''
                  }`} 
                />
                <span className={`text-xs font-medium ${
                  activeTab === item.id ? 'text-white' : ''
                }`}>
                  {item.label}
                </span>
                
                {/* Active indicator */}
                {activeTab === item.id && (
                  <motion.div
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Safe area for devices with home indicator */}
        <div className="h-safe-area-inset-bottom bg-white/95" />
      </div>

      {/* Modals */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => {
          setIsBookingModalOpen(false);
          setActiveTab('home');
        }} 
      />
      
      <EmbeddedChatbot 
        isOpen={isChatOpen} 
        onClose={() => {
          setIsChatOpen(false);
          setActiveTab('home');
        }} 
      />
    </>
  );
};

export default BottomNavigation;