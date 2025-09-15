import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// SIH Color Scheme
const colors = {
  primary: '#0066B2', // SIH Blue
  secondary: '#FF6B35', // SIH Orange
  accent: '#00A5E0', // SIH Light Blue
  dark: '#0A2342', // Dark Blue
  light: '#F7F9FC', // Off-White
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 10 }
};

const buttonTap = { scale: 0.98 };

import { useNavigate } from 'react-router-dom';

const Landing = ({ user }) => {
  const navigate = useNavigate();

  const handleProtectedNavigation = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate('/login', { state: { from: path } });
    }
  };

  const handleScheduleClick = () => {
    handleProtectedNavigation('/schedule');
  };

  const handleProblemStatementsClick = () => {
    handleProtectedNavigation('/dashboard');
  };

  const handlePrizesClick = () => {
    handleProtectedNavigation('/prizes');
  };

  const handleFaqClick = () => {
    handleProtectedNavigation('/faqs');
  };

  // Parallax effect for background elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (window.innerWidth / 2 - clientX) / 40;
      const y = (window.innerHeight / 2 - clientY) / 40;
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/10 animate-blob"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
          <motion.div
            className="flex-1 flex flex-col lg:flex-row gap-8 items-center"
            initial="hidden"
            animate="visible"
          >
          {/* Left Side - Content */}
          <motion.div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0" variants={itemVariants}>
            <motion.div 
              className="text-sm font-semibold tracking-wider text-blue-400 uppercase mb-4"
              variants={itemVariants}
            >
              Smart India Hackathon 2025
            </motion.div>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              variants={itemVariants}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                Poornima University
              </span>
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-blue-300">
                Internal Hackathon
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Join India's largest hackathon initiative to solve real-world problems and showcase your technical prowess.
              <br />
              <span className="text-blue-300">#SmartIndiaHackathon #InnovateForIndia</span>
            </motion.p>
          </motion.div>

          {/* Right Side - Register Button */}
          <motion.div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-8" variants={containerVariants}>
            <motion.div className="w-full max-w-md">
              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLScAdGIerAmcKVy4nh5W5A8cF_CO_YI9uOeD_K0JMDjgXofpTA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-12 py-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xl rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                🚀 Register Your Team
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
              variants={containerVariants}
            >
              {[
                { 
                  icon: '📋', 
                  title: 'Problem Statements', 
                  desc: 'Browse through various problem statements from different sectors',
                  color: 'from-indigo-500 to-blue-500',
                  onClick: handleProblemStatementsClick
                },
                { 
                  icon: '📊', 
                  title: 'SIH PPT Template', 
                  desc: 'Download the official SIH presentation template',
                  color: 'from-amber-500 to-orange-500',
                  onClick: () => handleProtectedNavigation('/template')
                },
                { 
                  icon: '📅', 
                  title: 'Event Schedule', 
                  desc: 'Check the timeline and important dates',
                  color: 'from-emerald-500 to-teal-500',
                  onClick: handleScheduleClick
                },
                { 
                  icon: '❓', 
                  title: 'FAQs', 
                  desc: 'Find answers to common questions',
                  color: 'from-purple-500 to-pink-500',
                  onClick: handleFaqClick
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={`group relative p-0.5 bg-gradient-to-r ${item.color} rounded-xl overflow-hidden`}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  onClick={item.onClick}
                >
                  <div className={`bg-gradient-to-br ${item.color} p-0.5 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300`}>
                    <div className="bg-gray-900/80 hover:bg-gray-800/50 p-6 rounded-xl h-full transition-all duration-300">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-gray-300 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Learn More Button */}
      <motion.div 
        className="w-full flex justify-center py-8 bg-gradient-to-b from-transparent to-gray-900/50"
        variants={itemVariants}
      >
        <a
          href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>
          </svg>
          Watch: SIH Guide & Pitching Tips
        </a>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="mt-auto py-8 text-center text-gray-400 text-sm w-full bg-gray-900/50"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>Organized by Poornima University in association with Smart India Hackathon</p>
          <p> {new Date().getFullYear()} SIH2025 - All rights reserved</p>
        </div>
      </motion.footer>
    </div>

    {/* Custom animations */}
    <style jsx={"true"} global={"true"}>{`
        html, body, #root {
          height: 100%;
          overflow: hidden;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-blob {
          animation: float 10s ease-in-out infinite;
          transform-origin: center;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e40af;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}
      </style>
    </div>
  );
};

export default Landing;