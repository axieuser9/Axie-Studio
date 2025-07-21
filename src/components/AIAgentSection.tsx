import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bot, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AIAgentSection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <motion.div 
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-bold mb-6 shadow-lg"
            initial={{ scale: 0, rotate: -10 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Bot className="mr-2 animate-bounce" size={20} />
            AI AGENT
            <Sparkles className="ml-2 animate-pulse" size={20} />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Meet Your AI Assistant
          </h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Experience the future of customer service with our intelligent AI agent that understands your business and helps your customers 24/7.
          </motion.p>
        </motion.div>

        {/* Embedded AI Agent */}
        <motion.div 
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">Axie AI Agent</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm opacity-90">Live & Ready to Help</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="text-yellow-300" size={20} />
                <span className="text-sm font-medium">Powered by AI</span>
              </div>
            </div>
          </div>

          {/* Embedded Content */}
          <div className="relative" style={{ height: '800px' }}>
            <iframe
              src="https://axieagent.netlify.app/"
              className="w-full h-full border-0"
              title="Axie AI Agent"
              allow="microphone; camera; geolocation"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
              loading="lazy"
            />
            
            {/* Loading overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-500" id="ai-agent-loading">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                <p className="text-gray-600 font-medium">Loading AI Agent...</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bot className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Availability</h3>
            <p className="text-gray-600">Always ready to help your customers, no matter the time or day.</p>
          </div>

          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Responses</h3>
            <p className="text-gray-600">Lightning-fast answers to customer questions and inquiries.</p>
          </div>

          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Learning</h3>
            <p className="text-gray-600">Continuously learns and improves from every interaction.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAgentSection;