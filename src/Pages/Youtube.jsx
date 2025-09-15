import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaClock, FaCalendarAlt, FaTimes } from 'react-icons/fa';

// SIH Color Scheme matching Landing.jsx
const colors = {
  primary: '#0066B2',
  secondary: '#FF6B35',
  accent: '#00A5E0',
  dark: '#0A2342',
  light: '#F7F9FC',
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const videoData = [
  {
    id: 1,
    title: "Smart India Hackathon 2024 Official Trailer",
    description: "Get ready for SIH 2024 with this official trailer showcasing the excitement and innovation",
    videoId: "33BR5Vhcfcc",
    duration: "2:30",
    date: "2024-01-15",
    views: "2.4M"
  },
  {
    id: 2,
    title: "Smart India Hackathon 2023 Grand Finale",
    description: "Experience the grand finale of SIH 2023 with all the highlights and winning moments",
    videoId: "WMgLFxewZ1Y",
    duration: "12:34",
    date: "2023-08-15",
    views: "1.2M"
  },
  {
    id: 2,
    title: "How to Win at SIH: Pro Tips",
    description: "Learn winning strategies and tips from past SIH champions",
    videoId: "_S97ArKlWYQ",
    duration: "15:45",
    date: "2023-09-01",
    views: "856K"
  },
  {
    id: 3,
    title: "SIH Project Showcase 2023",
    description: "Top innovative projects from SIH 2023 finalists",
    videoId: "nd4bBknAltk",
    duration: "18:22",
    date: "2023-08-20",
    views: "2.1M"
  },
  {
    id: 4,
    title: "Mentor's Guide to SIH Success",
    description: "Expert advice from SIH mentors on how to excel in the competition",
    videoId: "9SXmhCaXkzI",
    duration: "14:30",
    date: "2023-09-05",
    views: "543K"
  },
  {
    id: 5,
    title: "SIH Problem Statements Deep Dive",
    description: "Detailed analysis of SIH 2025 problem statements",
    videoId: "dNe-3Uk4o_c",
    duration: "22:15",
    date: "2023-08-25",
    views: "1.5M"
  },
  {
    id: 6,
    title: "SIH 2024: Behind the Scenes",
    description: "Exclusive behind-the-scenes look at the making of SIH 2024",
    videoId: "33BR5Vhcfcc",
    duration: "2:30",
    date: "2024-01-15",
    views: "2.4M"
  }
];

const YouTube = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset'; // Re-enable scrolling
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          SIH <span className="text-blue-400">Video Gallery</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Watch tutorials, highlights, and success stories from Smart India Hackathon
        </p>
      </motion.div>

      {/* Video Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {videoData.map((video) => (
          <motion.div
            key={video.id}
            className="block bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            onClick={() => openModal(video)}
          >
            <div className="relative">
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="bg-blue-500/80 w-16 h-16 rounded-full flex items-center justify-center">
                  <FaPlay className="text-white text-2xl" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2 h-14">
                {video.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">
                {video.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>{video.date}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-1" />
                  <span>{video.views} views</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Modal Content */}
            <motion.div 
              className="relative z-10 w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-20 p-2 text-gray-300 hover:text-white bg-black/50 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              
              {/* Video Iframe */}
              <div className="relative pt-[56.25%] w-full">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-300">{selectedVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YouTube;