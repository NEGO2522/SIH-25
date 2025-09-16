import React from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

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

const MobileMessage = () => {
  const [currentEmoji, setCurrentEmoji] = React.useState('💻');
  const emojis = ['💻', '🚀']; // Only laptop and SIH rocket emoji
  
  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % emojis.length;
      setCurrentEmoji(emojis[index]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '24px',
      textAlign: 'center',
      background: 'linear-gradient(160deg, #0A2342 0%, #0D2B4E 50%, #1A3C6A 100%)',
      color: '#FFFFFF',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: '1.6'
    }}>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '40px 24px',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 168, 224, 0.15) 0%, rgba(0, 168, 224, 0) 70%)',
          pointerEvents: 'none'
        }} />
        
        <motion.div
          style={{
            fontSize: '3.5rem',
            marginBottom: '20px',
            lineHeight: '1',
            display: 'inline-block',
            transformOrigin: 'center',
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, -5, 0]
          }}
          transition={{ 
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          {currentEmoji}
        </motion.div>
        
        <motion.h1 
          style={{ 
            color: '#FFFFFF',
            margin: '0 0 16px 0',
            fontSize: '1.8rem',
            fontWeight: '700',
            lineHeight: '1.3',
            background: 'linear-gradient(90deg, #FFFFFF, #A5D8FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Desktop Experience Required
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            marginBottom: '24px',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '1.05rem',
            lineHeight: '1.7'
          }}
        >
          <p style={{ margin: '0 0 16px 0' }}>
            For the best experience, please access this platform from a desktop or laptop computer.
          </p>
          <p style={{ 
            margin: 0,
            fontWeight: '500',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            The Smart India Hackathon platform is optimized for larger screens to provide you with the best possible experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '16px',
            borderLeft: `3px solid ${colors.accent}`,
            textAlign: 'left',
            margin: '32px 0 0 0'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <div style={{
              background: 'rgba(0, 168, 224, 0.15)',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: colors.accent,
              fontSize: '1.1rem'
            }}>
              ℹ️
            </div>
            <div>
              <p style={{
                margin: '0 0 4px 0',
                fontWeight: '600',
                color: '#FFFFFF',
                fontSize: '0.95rem'
              }}>
                Why desktop?
              </p>
              <p style={{
                margin: 0,
                color: 'rgba(255, 255, 255, 0.75)',
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}>
                The platform includes advanced features and tools that work best on larger screens, ensuring you have everything you need to succeed in the competition.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const DesktopLanding = ({ user, navigate }) => {
  // All hooks must be called unconditionally at the top level
  const [isClient, setIsClient] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  
  // Single effect to handle both client detection and mount state
  React.useEffect(() => {
    setIsClient(true);
    setIsMounted(true);
    
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
  
  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }
  
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


  return (
    <div className={`min-h-screen w-full bg-gray-900 overflow-x-hidden flex flex-col ${isMounted ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 300ms ease-in-out' }}>
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
      
      <div className="relative z-10 flex-1 flex flex-col w-full">
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                Poornima University
              </span>
              <br className="hidden sm:block" />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-300">
                Internal Hackathon
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Join India's largest hackathon initiative to solve real-world problems and showcase your technical prowess.
              <br />
              <span className="text-blue-300 text-sm sm:text-base">#SmartIndiaHackathon #InnovateForIndia</span>
            </motion.p>
          </motion.div>

          {/* Right Side - Register Button */}
          <motion.div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-8" variants={containerVariants}>
            <motion.div className="w-full max-w-md">
              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLScAdGIerAmcKVy4nh5W5A8cF_CO_YI9uOeD_K0JMDjgXofpTA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg sm:text-xl rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                🚀 Register Your Team
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full"
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
                    <div className="bg-gray-900/80 hover:bg-gray-800/50 p-4 sm:p-6 rounded-xl h-full transition-all duration-300">
                      <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{item.icon}</div>
                      <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">{item.title}</h3>
                      <p className="text-gray-300 text-xs sm:text-sm">{item.desc}</p>
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
        <button
          onClick={() => navigate('/youtube')}
          className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm sm:text-base font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>
          </svg>
          Watch: SIH Guide & Pitching Tips
        </button>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="mt-auto py-6 sm:py-8 text-center text-gray-400 text-xs sm:text-sm w-full bg-gray-900/50"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-1 sm:mb-2">Organized by Poornima University in association with Smart India Hackathon</p>
          <p>© {new Date().getFullYear()} SIH2025 - All rights reserved</p>
        </div>
      </motion.footer>
    </div>

    {/* Custom animations */}
    <style jsx global>{`
        html, body, #root {
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }
        @media (max-width: 640px) {
          html, body, #root {
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
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

const Landing = ({ user }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();
  
  if (isMobile) {
    return <MobileMessage />;
  }
  
  return <DesktopLanding user={user} navigate={navigate} />;
};

export default Landing;