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
        const response = await fetch('/src/Data/Faq\'s.txt');
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
                  <li><a href="/prizes" className="text-blue-300 hover:text-white transition-colors">Prizes & Rewards</a></li>
                  <li><a href="/register" className="text-blue-300 hover:text-white transition-colors">Register Now</a></li>
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
                    <span>+91 XXXXXXXXXX</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-400 hover:text-white transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-blue-400 hover:text-white transition-colors">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-blue-400 hover:text-white transition-colors">
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