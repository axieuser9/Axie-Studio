import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Minimize2, Maximize2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface EmbeddedChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmbeddedChatbot: React.FC<EmbeddedChatbotProps> = ({ isOpen, onClose }) => {
  const { currentLanguage } = useLanguage();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Reset loading state when opening
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setIsMinimized(false);
    }
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleOpenExternal = () => {
    window.open('https://axiestudiochatbot.netlify.app', '_blank');
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Chatbot close button clicked'); // Debug log
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />
        )}
        
        {/* Chatbot Container */}
        <div className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 ${
          isMobile ? 'w-full h-full m-4' : 'w-full h-full'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between flex-shrink-0">
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
              {/* External link button */}
              <button
                onClick={handleOpenExternal}
                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                title={currentLanguage.code === 'sv' ? 'Öppna i nytt fönster' : 'Open in new window'}
              >
                <ExternalLink size={14} />
              </button>
              
              {/* Minimize/Maximize button - Desktop only */}
              {!isMobile && (
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                  title={isMinimized ? 'Maximera' : 'Minimera'}
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
              )}
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-red-500/80 transition-colors"
                title={currentLanguage.code === 'sv' ? 'Stäng' : 'Close'}
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {/* Chatbot Content */}
          {!isMinimized && (
            <div className="relative flex-1 h-full">
              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
                    <p className="text-gray-600 text-sm">
                      {currentLanguage.code === 'sv' ? 'Laddar chat...' : 'Loading chat...'}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Iframe */}
              <iframe
                src="https://axiestudiochatbot.netlify.app"
                className="w-full h-full border-0"
                title="Axie Studio Chatbot"
                allow="microphone; camera"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                onLoad={handleIframeLoad}
                style={{ 
                  height: isMobile ? 'calc(100vh - 160px)' : '552px',
                  minHeight: '400px'
                }}
              />
            </div>
          )}
          
          {/* Minimized State */}
          {isMinimized && (
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {currentLanguage.code === 'sv' ? 'Chat minimerad' : 'Chat minimized'}
                </span>
              </div>
              <button
                onClick={() => setIsMinimized(false)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {currentLanguage.code === 'sv' ? 'Öppna' : 'Open'}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmbeddedChatbot;