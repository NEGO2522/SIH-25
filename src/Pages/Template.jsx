import React from 'react';
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
            duration: 0.5
        }
    }
};

const Template = () => {
    const pptxUrl = 'https://docs.google.com/presentation/d/1Gam_W9VPRS9jr8YLwjZ5iWlRoucOy0td/export/pptx';

    return (
        <div
            className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
            style={{
                background: `linear-gradient(135deg, ${colors.light} 0%, #ffffff 100%)`,
                backgroundAttachment: 'fixed',
                minHeight: '100vh'
            }}
        >
            <motion.div
                className="max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-100 mb-8 relative"
                    variants={itemVariants}
                >
                    <a 
                        href="/"
                        className="absolute top-6 left-6 md:left-8 inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 z-10 bg-white/80 px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm"
                    >
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </a>
                    <div className="p-6 md:p-8">
                        <motion.div
                            className="text-center mb-8"
                            variants={itemVariants}
                        >
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">SIH2025 IDEA Presentation</h1>
                            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
                            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                                Download the official presentation template for your SIH2025 project submission.
                            </p>
                        </motion.div>

                        <motion.div
                            className="w-full bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
                            variants={itemVariants}
                        >
                            <div className="p-6 flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-50 to-white">
                                <div className="max-w-2xl w-full bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                                    <div className="mb-6">
                                        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-50">
                                            <svg
                                                className="h-12 w-12 text-blue-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <motion.h3
                                        className="text-2xl font-bold text-gray-900 mb-3"
                                        variants={itemVariants}
                                    >
                                        SIH2025 Presentation Template
                                    </motion.h3>

                                    <motion.p
                                        className="text-gray-600 mb-8 max-w-md mx-auto"
                                        variants={itemVariants}
                                    >
                                        Download the official presentation template for your project submission.
                                    </motion.p>

                                    <motion.div variants={itemVariants}>
                                        <a
                                            href={pptxUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-8 py-3.5 text-base font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
                                        >
                                            <svg
                                                className="-ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Download Template (.pptx)
                                        </a>
                                    </motion.div>

                                    <motion.div
                                        className="mt-6 pt-6 border-t border-gray-100"
                                        variants={itemVariants}
                                    >
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">File format:</span> Microsoft PowerPoint (.pptx)
                                        </p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            For best results, open this file in Microsoft PowerPoint 2016 or later
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-10 bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm max-w-6xl mx-auto"
                    variants={itemVariants}
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Use This Template</h3>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
                                title: 'Download the Template',
                                description: 'Click the download button above to get the PowerPoint template file.'
                            },
                            {
                                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
                                title: 'Open in PowerPoint',
                                description: 'Open the downloaded file in Microsoft PowerPoint 2016 or later.'
                            },
                            {
                                icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
                                title: 'Customize Content',
                                description: 'Replace the placeholder text and images with your project details.'
                            },
                            {
                                icon: 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4',
                                title: 'Save & Submit',
                                description: 'Save your changes and submit as per SIH guidelines.'
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                                whileHover={{ y: -2 }}
                                variants={itemVariants}
                            >
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                    <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};


export default Template;