import React, { useEffect } from 'react';

interface EmbeddedChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmbeddedChatbot: React.FC<EmbeddedChatbotProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    // Add event listener for messages from the embedded chatbot
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from our chatbot domain
      if (event.origin !== 'https://axiestudiochatbot.netlify.app') {
        return;
      }
      
      // Handle specific messages from the chatbot
      if (event.data.type === 'close_chatbot') {
        onClose();
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chatbot Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md h-[600px] max-h-[80vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              🤖
            </div>
            <div>
              <h3 className="font-semibold">Axie Assistant</h3>
              <p className="text-xs opacity-90">AI-powered support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Embedded Chatbot */}
        <iframe
          src="https://axiestudiochatbot.netlify.app"
          className="w-full h-full border-0"
          title="Axie Studio Chatbot"
          allow="microphone; camera"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
};

export default EmbeddedChatbot;