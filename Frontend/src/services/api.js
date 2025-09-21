import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const api = {
  sendMessage: async (content) => {
    try {
      const response = await axios.post(`${API_URL}/chat`, { 
        message: content,
        conversation_id: null
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export default api;