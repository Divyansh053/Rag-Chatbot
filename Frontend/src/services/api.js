import axios from 'axios';

// This logic checks if the app is in production mode (on Vercel).
// If it is, it uses the relative '/api' path.
// If not (i.e., in local development), it uses the local server address.
const API_URL = process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://127.0.0.1:8000';

const api = {
  sendMessage: async (content) => {
    try {
      const response = await axios.post(`${API_URL}/chat`, { 
        message: content,
        conversation_id: null // You can manage this for session history later
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export default api;