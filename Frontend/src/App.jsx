import React, { useState } from 'react';
import ChatContainer from './components/ChatContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './styles/globals.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900`}>
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
                <FontAwesomeIcon icon={faBrain} />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">RAG Chatbot</h1>
            </div>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              aria-label="Toggle dark mode"
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)]">
          <ChatContainer />
        </div>
      </main>
      
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Powered by RAG Technology
        </div>
      </footer>
    </div>
  );
}

export default App;