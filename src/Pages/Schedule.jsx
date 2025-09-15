import React from 'react';
import { motion } from 'framer-motion';

const Schedule = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            SIH 2025 Timeline
          </h1>
          <div className="w-10"></div> {/* Spacer to balance the layout */}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="w-full h-1 bg-blue-500 mt-2"></div>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-2xl">
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg sm:rounded-xl">
            <img
              src="/images/SIH-2025.png" 
              alt="SIH 2025 Timeline" 
              className="absolute top-0 left-0 w-full h-full object-contain p-2 sm:p-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/1200x675/0a2342/ffffff?text=SIH+2025+Timeline';
              }}
            />
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">
            * Timeline is subject to change. Please check back for updates.
          </p>
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="mt-8 flex justify-center space-x-4 sm:hidden">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;