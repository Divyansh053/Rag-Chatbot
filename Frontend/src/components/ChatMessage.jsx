import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot, faChevronDown, faChevronUp, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const ChatMessage = ({ message, isUser }) => {
  const [showSources, setShowSources] = useState(false);

  // If no sources or it's a user message, don't show the sources toggle
  const hasSources = !isUser && message.sources && message.sources.length > 0;

  return (
    <div className={`p-4 ${isUser ? 'message-user' : 'message-bot'} rounded-lg mb-4`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {isUser ? (
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faUser} />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faRobot} />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="font-medium mb-1">{isUser ? 'You' : 'AI Assistant'}</div>
          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
          
          {hasSources && (
            <div className="mt-3">
              <button 
                onClick={() => setShowSources(!showSources)}
                className="flex items-center text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={showSources ? faChevronUp : faChevronDown} className="mr-1" />
                {showSources ? 'Hide sources' : 'Show sources'}
              </button>
              
              {showSources && (
                <div className="mt-2 border-t border-gray-200 pt-2">
                  <div className="text-xs font-medium text-gray-500 mb-1">Sources:</div>
                  <div className="space-y-2">
                    {message.sources.map((source, index) => (
                      <div key={index} className="bg-gray-100 dark:bg-gray-700/50 p-2 rounded text-xs">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-gray-500" />
                          <span className="font-medium">{source.metadata?.source_file || 'Document'}</span>
                        </div>
                        <div className="mt-1 text-gray-600 dark:text-gray-300 line-clamp-2">
                          {source.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;