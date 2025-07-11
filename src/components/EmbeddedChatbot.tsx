import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface EmbeddedChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmbeddedChatbot: React.FC<EmbeddedChatbotProps> = ({ isOpen, onClose }) => {
  const { currentLanguage } = useLanguage();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when chatbot is open on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed z-50 ${
          isMobile 
            ? 'inset-0' 
            : isMinimized 
              ? 'bottom-4 right-4 w-80 h-16' 
              : 'bottom-4 right-4 w-96 h-[600px]'
        }`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Mobile backdrop */}
        {isMobile && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        )}
        
        {/* Chatbot Container */}
        <div className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 ${
          isMobile ? 'w-full h-full' : 'w-full h-full'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">
                  {currentLanguage.code === 'sv' ? 'Axie Assistent' : 'Axie Assistant'}
                </h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs opacity-90">
                    {currentLanguage.code === 'sv' ? 'Online' : 'Online'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Minimize/Maximize button - Desktop only */}
              {!isMobile && (
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
              )}
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {/* Chatbot Content */}
          {!isMinimized && (
            <div className="flex-1 h-full">
              <iframe
                src="https://axiestudiochatbot.netlify.app"
                className="w-full h-full border-0"
                title="Axie Studio Chatbot"
                allow="microphone; camera"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                style={{ height: isMobile ? 'calc(100vh - 80px)' : '552px' }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmbeddedChatbot;