import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import EmbeddedChatbot from './EmbeddedChatbot';

const AIFloatingButton: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Opening chat...'); // Debug log
    setIsChatOpen(true);
    
    // Track AI interaction
    if (typeof window !== 'undefined' && window.trackAIInteraction) {
      window.trackAIInteraction('embedded_chatbot_opened', 'AI Assistant');
    }
  };

  const handleCloseChat = () => {
    console.log('Closing chat...'); // Debug log
    setIsChatOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Floating Button - Only visible on desktop when chat is closed */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-40 hidden md:block"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.button
              onClick={handleOpenChat}
              className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-none outline-none focus:outline-none focus:ring-4 focus:ring-blue-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              aria-label={currentLanguage.code === 'sv' ? 'Öppna chat' : 'Open chat'}
            >
              <MessageCircle className="w-7 h-7" />
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-50">
                {currentLanguage.code === 'sv' ? 'Chatta med oss' : 'Chat with us'}
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </motion.button>
            
            {/* Pulse effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-20 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Chatbot */}
      <EmbeddedChatbot 
        isOpen={isChatOpen} 
        onClose={handleCloseChat} 
      />
    </>
  );
};

export default AIFloatingButton;