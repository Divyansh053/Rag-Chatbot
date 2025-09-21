import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content) => {
    // Add user message to chat
    const userMessage = { content, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Make API call to backend using our API service
      const data = await api.sendMessage(content);
      
      // Format the bot response
      const botMessage = {
        content: data.response,
        isUser: false,
        sources: data.retrieved_docs || [],
        query: data.query
      };
      
      // Add bot message to chat
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      const errorMessage = {
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <h3 className="text-xl font-semibold mb-2">Welcome to RAG Chatbot</h3>
              <p>Ask me anything about the documents in the knowledge base!</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message} 
              isUser={message.isUser} 
            />
          ))
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-2 p-4 message-bot rounded-lg">
            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            </div>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;