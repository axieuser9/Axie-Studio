import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SimpleChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show widget after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const openChatbot = () => {
    // Option 1: Open in new window/tab
    window.open('https://axiestudiochatbot.netlify.app', '_blank', 'width=400,height=600,scrollbars=yes,resizable=yes');
    
    // Option 2: Open in modal (uncomment if you prefer this)
    // setIsOpen(true);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              onClick={openChatbot}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              aria-label="Open AI Chat"
            >
              <MessageCircle size={24} />
            </button>
            
            {/* Pulse animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal (if you prefer embedded instead of popup) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chatbot Container */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md h-[600px]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle size={20} />
                  <span className="font-semibold">Axie Assistant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={openChatbot}
                    className="p-1 hover:bg-white/20 rounded"
                    title="Open in new window"
                  >
                    <ExternalLink size={16} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              
              {/* Embedded Chatbot */}
              <iframe
                src="https://axiestudiochatbot.netlify.app"
                className="w-full h-full border-0"
                title="Axie Studio Chatbot"
                allow="microphone; camera"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SimpleChatbotWidget;