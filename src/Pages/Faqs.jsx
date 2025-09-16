import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Faqs = () => {
  const [faqSections, setFaqSections] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [visibleQuestions, setVisibleQuestions] = useState(3); // Show 3 questions by default

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('/Data/Faqs.txt');
        if (!response.ok) {
          throw new Error('Failed to load FAQs');
        }
        const text = await response.text();
        const sections = parseFaqText(text);
        setFaqSections(sections);
      } catch (err) {
        console.error('Error loading FAQs:', err);
        setError('Failed to load FAQs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // Parse the FAQ text into sections and questions
  const parseFaqText = (text) => {
    const sections = [];
    let currentSection = { title: 'General FAQ', items: [] };
    
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check for section headers (lines containing 'FAQ' but not 'FAQ\'s add')
      if (line.includes('FAQ') && !line.includes("FAQ's add")) {
        // Save current section if it has items
        if (currentSection.items.length > 0) {
          sections.push({...currentSection});
        }
        // Start new section
        currentSection = { 
          title: line, 
          items: [] 
        };
      } 
      // Check for questions (lines starting with Q. followed by a number)
      else if (line.match(/^Q\.\s*\d+\./)) {
        const question = line.replace(/^Q\.\s*\d+\.\s*/, '').trim();
        let answer = [];
        
        // Collect all following lines until next question or section
        while (i + 1 < lines.length && !lines[i + 1].match(/^(Q\.\s*\d+\.|FAQ)/)) {
          i++;
          if (lines[i].trim()) {
            answer.push(lines[i].trim());
          }
        }
        
        currentSection.items.push({
          question,
          answer: answer.join('\n')
        });
      }
    }
    
    // Add the last section if it has items
    if (currentSection.items.length > 0) {
      sections.push(currentSection);
    }
    
    return sections;
  };

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleSection = (sectionIndex) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
  };

  // Filter FAQs based on search query
  const filteredSections = faqSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-red-500 text-center p-6 bg-gray-800/50 rounded-xl">
          <p className="text-xl font-semibold mb-2">Error Loading FAQs</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 w-full relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 10 + 10}s infinite alternate`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.5);
            opacity: 0.1;
          }
        }
      `}</style>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-blue-200 mb-6">Find answers to common questions about Smart India Hackathon 2025</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search questions or answers..."
                  className="w-full px-6 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute right-3 top-3.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start w-full"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredSections.map((section, sectionIndex) => (
              <motion.div 
                key={sectionIndex} 
                className="bg-gray-800/30 rounded-2xl p-6 shadow-lg backdrop-blur-sm flex flex-col"
                variants={item}
              >
                <h2 className="text-2xl font-bold text-blue-400 mb-6 pb-2 border-b border-blue-900/50">
                  {section.title}
                </h2>
                
                <div className="flex-grow flex flex-col">
                  <div className="space-y-4 flex-grow">
                    {section.items.slice(0, expandedSections[sectionIndex] ? section.items.length : Math.min(visibleQuestions, section.items.length)).map((faq, index) => {
                      const uniqueId = `${sectionIndex}-${index}`;
                      const isActive = activeIndex === uniqueId;
                      
                      return (
                        <motion.div 
                          key={uniqueId}
                          className="bg-gray-900/40 rounded-xl overflow-hidden border border-gray-700/50"
                          variants={item}
                        >
                          <button
                            className={`w-full px-6 py-4 text-left flex justify-between items-center transition-colors ${
                              isActive ? 'bg-blue-900/20' : 'hover:bg-gray-800/50'
                            }`}
                            onClick={() => toggleFaq(uniqueId)}
                          >
                            <span className="font-medium text-lg text-blue-100 pr-4">
                              {faq.question}
                            </span>
                            <motion.span
                              animate={{ rotate: isActive ? 180 : 0 }}
                              className="flex-shrink-0 text-blue-400"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </motion.span>
                          </button>
                          
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-6 pt-2 text-gray-300 whitespace-pre-line">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {section.items.length > visibleQuestions && !expandedSections[sectionIndex] ? (
                    <div className="mt-4">
                      <button
                        onClick={() => toggleSection(sectionIndex)}
                        className="w-full px-6 py-3 text-blue-400 hover:text-blue-300 font-medium rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-colors text-center"
                      >
                        View {section.items.length - visibleQuestions} more questions
                      </button>
                    </div>
                  ) : expandedSections[sectionIndex] ? (
                    <div className="mt-4">
                      <button
                        onClick={() => toggleSection(sectionIndex)}
                        className="w-full px-6 py-3 text-blue-400 hover:text-blue-300 font-medium rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-colors text-center"
                      >
                        Show Less
                      </button>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Footer Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-blue-300 hover:text-white transition-colors">Home</a></li>
                  <li><a href="/schedule" className="text-blue-300 hover:text-white transition-colors">Event Schedule</a></li>
                  <li><a href="/faqs" className="text-blue-300 hover:text-white transition-colors">FAQs</a></li>
                  <li><a href="/template" className="text-blue-300 hover:text-white transition-colors">SIH PPT Template</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>sih2025@example.com</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+91 94145XXXXX</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/poornima.university/?igsh=MWt0a2NybG1oaTRnZA%3D%3D#" className="text-blue-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/school/poornima-university/posts/?feedView=all" className="text-blue-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 text-sm">
                    {new Date().getFullYear()} Smart India Hackathon. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;