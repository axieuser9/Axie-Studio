import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, Settings, ChevronDown, Crown, Sparkles } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  if (!user) return null

  return (
    <div className="relative">
      {/* User Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm border border-gray-200/50 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-black rounded-full flex items-center justify-center">
          <User size={16} className="text-white" />
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-semibold text-gray-900">
            {user.email?.split('@')[0]}
          </div>
          <div className="text-xs text-gray-500">
            Premium Member
          </div>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-black text-white p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <div className="font-semibold">{user.email?.split('@')[0]}</div>
                  <div className="text-sm text-white/80">{user.email}</div>
                </div>
              </div>
              
              <div className="mt-3 flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <Crown size={16} className="text-yellow-400" />
                <span className="text-sm font-medium">Premium Member</span>
                <Sparkles size={14} className="text-yellow-400" />
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="p-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <Settings size={18} className="text-gray-500" />
                <span className="text-gray-700">Account Settings</span>
              </button>
              
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-3 flex items-center space-x-3 hover:bg-red-50 rounded-xl transition-colors text-red-600"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserMenu