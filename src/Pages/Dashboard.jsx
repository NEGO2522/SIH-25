import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from '../Firebase/firebase'; // Adjust the import path as per your project structure

const Dashboard = () => {
  const [problemStatements, setProblemStatements] = useState([]);
  const [filteredStatements, setFilteredStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    department: '',
    theme: ''
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const fetchProblemStatements = async () => {
      try {
        console.log('Initializing database...');
        const db = getDatabase(app);
        console.log('Database instance:', db);
        
        // Use root reference since the data is at the root level
        const problemStatementsRef = ref(db);
        console.log('Using root database reference');
        
        console.log('Setting up database listener...');
        const unsubscribe = onValue(problemStatementsRef, 
          (snapshot) => {
            if (!mounted) return;
            
            console.log('Received data snapshot:', snapshot);
            const data = snapshot.val();
            console.log('Parsed data:', data);
            
            const statementsArray = [];
            if (data) {
              // If data is an array
              if (Array.isArray(data)) {
                data.forEach((statement, index) => {
                  statementsArray.push({
                    id: statement.id || `item-${index}`,
                    ps_id: statement.ps_id || statement['ps-id'] || `ps-${index + 1}`,
                    ...statement
                  });
                });
              } 
              // If data is an object with keys
              else if (typeof data === 'object') {
                Object.entries(data).forEach(([key, statement], index) => {
                  if (statement) {
                    statementsArray.push({
                      id: statement.id || key,
                      ps_id: statement.ps_id || statement['ps-id'] || `ps-${key}`,
                      ...statement
                    });
                  }
                });
              }
              
              console.log('Mapped problem statements:', statementsArray);
              setProblemStatements(statementsArray);
              setFilteredStatements(statementsArray);
            } else {
              console.warn('No data found in the database');
              setProblemStatements([]);
            }
            setLoading(false);
          }, 
          (error) => {
            if (!mounted) return;
            console.error('Error fetching problem statements:', error);
            setError(`Failed to load problem statements: ${error.message}`);
            setLoading(false);
          }
        );

        // Cleanup function
        return () => {
          console.log('Cleaning up database listener...');
          off(problemStatementsRef);
          mounted = false;
        };

      } catch (error) {
        console.error('Error in fetchProblemStatements:', error);
        if (mounted) {
          setError(`Error: ${error.message}`);
          setLoading(false);
        }
      }
    };

    fetchProblemStatements();

    return () => {
      mounted = false;
    };
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    const filtered = problemStatements.filter(statement => {
      return (
        (filters.category === '' || statement.category === filters.category) &&
        (filters.department === '' || statement.department === filters.department) &&
        (filters.theme === '' || statement.theme === filters.theme)
      );
    });
    setFilteredStatements(filtered);
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      department: '',
      theme: ''
    });
    setFilteredStatements(problemStatements);
  };

  const handleViewDetails = (statement) => {
    setSelectedCard(statement);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset'; // Re-enable scrolling
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-gray-600">Loading problem statements...</p>
        <p className="text-sm text-gray-500">Please wait while we fetch the latest data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-6 bg-red-50 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Error Loading Data</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <p className="text-gray-600 text-sm">
          Please check your internet connection and try refreshing the page. If the problem persists, 
          contact support with the error details shown above.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 p-4 md:p-8 overflow-x-hidden ${isModalOpen ? 'overflow-y-hidden' : ''}`}>
      {isModalOpen && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}
      {/* Modal */}
      {isModalOpen && selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedCard.title || 'Problem Statement Details'}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close modal"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                {selectedCard.background && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Background</h3>
                    <p className="text-gray-600 whitespace-pre-line">{selectedCard.background}</p>
                  </div>
                )}

                {selectedCard.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600 whitespace-pre-line">{selectedCard.description}</p>
                  </div>
                )}

                {selectedCard.solution && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Expected Solution</h3>
                    <p className="text-gray-600 whitespace-pre-line">{selectedCard.solution}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200">
                  {selectedCard.organization && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{selectedCard.organization}</span>
                    </div>
                  )}
                  {selectedCard.category && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{selectedCard.category}</span>
                    </div>
                  )}
                  {selectedCard.theme && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10a1 1 0 01-1.64 0l-7-10A1 1 0 012 7h5.5l1.8-5.954a1 1 0 011.8 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{selectedCard.theme}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Problem Statements</h1>
          <p className="text-blue-100">Browse and filter through available problem statements</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
      
      {problemStatements.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 text-blue-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700">No problem statements found</h3>
          <p className="mt-2 text-gray-500">Check back later or try adjusting your filters</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Filter Statements</h2>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button 
                  onClick={applyFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 7.707A1 1 0 013 7V3z" clipRule="evenodd" />
                  </svg>
                  Apply Filters
                </button>
                <button 
                  onClick={resetFilters}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <div className="relative">
                        <select 
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="">All Categories</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Software">Software</option>
                    </select>
              </div>
              <div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <div className="relative">
                    <select 
                      name="department"
                      value={filters.department}
                      onChange={handleFilterChange}
                      className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="">All Departments</option>
                      {Array.from(new Set(problemStatements.map(ps => ps.department))).map((dept, i) => (
                        <option key={i} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Theme</label>
                  <div className="relative">
                    <select 
                      name="theme"
                      value={filters.theme}
                      onChange={handleFilterChange}
                      className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="">All Themes</option>
                      {Array.from(new Set(problemStatements.map(ps => ps.theme))).map((theme, i) => (
                        <option key={i} value={theme}>{theme}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              </div>
              <div className="flex items-end space-x-2 mt-6">
                <button 
                  onClick={applyFilters}
                  className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
                <button 
                  onClick={resetFilters}
                  className="w-1/2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          </div>
          {/* Problem Statements - Horizontal Scroll */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredStatements.length} {filteredStatements.length === 1 ? 'Problem' : 'Problems'} Found
              </h2>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-500">
                  Scroll horizontally to view all problems
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {filteredStatements.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
                <div className="mx-auto w-16 h-16 text-gray-300 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No matching problem statements</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
                <button 
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="w-full overflow-x-auto pb-6">
                <div className="flex flex-wrap gap-4">
                  {filteredStatements.map((statement) => (
                    <div 
                      key={statement['ps-id'] || statement.id} 
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 w-full md:w-72 flex flex-col"
                      style={{ height: '420px' }}
                    >
                      <div className="p-2 flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-800">
                            {statement.ps_id || statement['ps-id'] || 'ID: N/A'}
                          </span>
                          <div className="flex space-x-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-800">
                              Open
                            </span>
                            <button 
                              onClick={() => handleViewDetails(statement)}
                              className="inline-flex items-center p-1 text-gray-400 hover:text-gray-600"
                              aria-label="View details"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 mt-1 line-clamp-2 min-h-[2.5rem]">
                          {statement.title || 'Untitled Problem Statement'}
                        </h3>
                        <div className="mt-2 text-sm text-gray-600 mb-3 line-clamp-3">
                          {statement.description && (
                            <div className="mb-3">
                              <h4 className="font-medium text-gray-800 mb-1">Description:</h4>
                              <p className="whitespace-pre-line">{statement.description}</p>
                            </div>
                          )}
                          {statement.solution && (
                            <div className="mb-3">
                              <h4 className="font-medium text-gray-800 mb-1">Proposed Solution:</h4>
                              <p className="whitespace-pre-line">{statement.solution}</p>
                            </div>
                          )}
                          {statement.impact && (
                            <div className="mb-3">
                              <h4 className="font-medium text-gray-800 mb-1">Expected Impact:</h4>
                              <p className="whitespace-pre-line">{statement.impact}</p>
                            </div>
                          )}
                        </div>
                        <div className="h-px bg-gray-100 my-1.5"></div>
                        <div className="space-y-1 mt-1 text-xs text-gray-600 flex-grow">
                          {statement.organization && (
                            <div className="flex items-start">
                              <svg className="h-4 w-4 text-gray-400 mr-1.5 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                              </svg>
                              <span>{statement.organization}</span>
                            </div>
                          )}
                          {statement.department && (
                            <div className="flex items-start">
                              <svg className="h-4 w-4 text-gray-400 mr-1.5 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              <span>{statement.department}</span>
                            </div>
                          )}
                          {statement.category && (
                            <div className="flex items-start">
                              <svg className="h-4 w-4 text-gray-400 mr-1.5 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                              </svg>
                              <span>{statement.category}</span>
                            </div>
                          )}
                          {statement.theme && (
                            <div className="flex items-start">
                              <svg className="h-4 w-4 text-gray-400 mr-1.5 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10a1 1 0 01-1.64 0l-7-10A1 1 0 012 7h5.5l1.8-5.954a1 1 0 011.8 0z" clipRule="evenodd" />
                              </svg>
                              <span>{statement.theme}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-1.5">
                          <button 
                            className="w-full flex items-center justify-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
                            onClick={() => handleViewDetails(statement)}
                          >
                            View Details
                            <svg className="ml-1 -mr-1 h-3 w-3" 
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </main>
    </div>
  );
}

export default Dashboard;