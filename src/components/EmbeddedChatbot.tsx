import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Minimize2, Maximize2, ExternalLink, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface EmbeddedChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmbeddedChatbot: React.FC<EmbeddedChatbotProps> = ({ isOpen, onClose }) => {
  const { currentLanguage } = useLanguage();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Prevent body scroll when chatbot is open on mobile/tablet
  useEffect(() => {
    if (isOpen && (isMobile || isTablet)) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
    };
  }, [isOpen, isMobile, isTablet]);

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
    console.log('Chatbot close button clicked');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && (isMobile || isTablet)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Mobile Layout (Full Screen)
  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 bg-white"
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Mobile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {currentLanguage.code === 'sv' ? 'Axie Assistent' : 'Axie Assistant'}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm opacity-90">
                    {currentLanguage.code === 'sv' ? 'Online' : 'Online'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleOpenExternal}
                className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors touch-manipulation"
                title={currentLanguage.code === 'sv' ? 'Öppna i nytt fönster' : 'Open in new window'}
              >
                <ExternalLink size={18} />
              </button>
              
              <button
                onClick={handleClose}
                className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-red-500/80 transition-colors touch-manipulation"
                title={currentLanguage.code === 'sv' ? 'Stäng' : 'Close'}
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          {/* Mobile Content */}
          <div className="relative flex-1 h-full bg-white" style={{ height: 'calc(100vh - 80px)' }}>
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600 text-lg font-medium">
                    {currentLanguage.code === 'sv' ? 'Laddar chat...' : 'Loading chat...'}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {currentLanguage.code === 'sv' ? 'Ansluter till AI-assistenten' : 'Connecting to AI assistant'}
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
                height: '100%',
                minHeight: '400px',
                backgroundColor: 'white'
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Tablet Layout (Large Modal)
  if (isTablet) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Tablet Modal */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 w-full max-w-2xl h-[80vh] max-h-[700px]"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tablet Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">
                    {currentLanguage.code === 'sv' ? 'Axie Assistent' : 'Axie Assistant'}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm opacity-90">
                      {currentLanguage.code === 'sv' ? 'AI-assistent online' : 'AI assistant online'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleOpenExternal}
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                  title={currentLanguage.code === 'sv' ? 'Öppna i nytt fönster' : 'Open in new window'}
                >
                  <ExternalLink size={20} />
                </button>
                
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                  title={isMinimized ? 'Maximera' : 'Minimera'}
                >
                  {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
                </button>
                
                <button
                  onClick={handleClose}
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-red-500/80 transition-colors"
                  title={currentLanguage.code === 'sv' ? 'Stäng' : 'Close'}
                >
                  <X size={22} />
                </button>
              </div>
            </div>
            
            {/* Tablet Content */}
            {!isMinimized && (
              <div className="relative flex-1 h-full bg-white" style={{ height: 'calc(80vh - 96px)' }}>
                {/* Loading State */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                      <p className="text-gray-600 text-lg font-medium">
                        {currentLanguage.code === 'sv' ? 'Laddar chat...' : 'Loading chat...'}
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        {currentLanguage.code === 'sv' ? 'Ansluter till AI-assistenten' : 'Connecting to AI assistant'}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Iframe */}
                <iframe
                  src="https://axiestudiochatbot.netlify.app"
                  className="w-full h-full border-0 rounded-b-3xl"
                  title="Axie Studio Chatbot"
                  allow="microphone; camera"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  onLoad={handleIframeLoad}
                  style={{ 
                    height: '100%',
                    minHeight: '400px',
                    backgroundColor: 'white'
                  }}
                />
              </div>
            )}
            
            {/* Minimized State for Tablet */}
            {isMinimized && (
              <div className="p-6 flex items-center justify-between bg-gray-50">
                <div className="flex items-center space-x-3">
                  <MessageCircle size={24} className="text-blue-600" />
                  <span className="text-lg font-medium text-gray-700">
                    {currentLanguage.code === 'sv' ? 'Chat minimerad' : 'Chat minimized'}
                  </span>
                </div>
                <button
                  onClick={() => setIsMinimized(false)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  {currentLanguage.code === 'sv' ? 'Öppna chat' : 'Open chat'}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Desktop Layout (Bottom Right Corner)
  return (
    <AnimatePresence>
      <motion.div
        className={`fixed z-50 ${
          isMinimized 
            ? 'bottom-4 right-4 w-80 h-16' 
            : 'bottom-4 right-4 w-96 h-[600px]'
        }`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Desktop Chatbot Container */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 w-full h-full">
          {/* Desktop Header */}
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
              <button
                onClick={handleOpenExternal}
                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                title={currentLanguage.code === 'sv' ? 'Öppna i nytt fönster' : 'Open in new window'}
              >
                <ExternalLink size={14} />
              </button>
              
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                title={isMinimized ? 'Maximera' : 'Minimera'}
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
              
              <button
                onClick={handleClose}
                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-red-500/80 transition-colors"
                title={currentLanguage.code === 'sv' ? 'Stäng' : 'Close'}
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {/* Desktop Content */}
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
                  height: '552px',
                  minHeight: '400px',
                  backgroundColor: 'white'
                }}
              />
            </div>
          )}
          
          {/* Desktop Minimized State */}
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