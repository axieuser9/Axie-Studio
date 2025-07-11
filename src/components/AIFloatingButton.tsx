import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Bot } from 'lucide-react';
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

  const handleOpenChat = () => {
    setIsChatOpen(true);
    
    // Track AI interaction
    if (typeof window !== 'undefined' && window.trackAIInteraction) {
      window.trackAIInteraction('embedded_chatbot_opened', 'AI Assistant');
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Simple Floating Button - Hidden on mobile when bottom nav is present */}
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
              className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bot className="w-6 h-6" />
            </motion.button>
            
            {/* Simple pulse effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-20" />
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