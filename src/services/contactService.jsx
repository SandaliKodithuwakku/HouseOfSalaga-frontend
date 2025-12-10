import api from './api';

const contactService = {
  sendMessage: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default contactService;
