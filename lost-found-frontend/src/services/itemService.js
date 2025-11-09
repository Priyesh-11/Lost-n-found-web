import api from './api';

export const itemService = {
  // Get all found items
  getFoundItems: async (params = {}) => {
    try {
      const response = await api.get('/items/found', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all lost items
  getLostItems: async (params = {}) => {
    try {
      const response = await api.get('/items/lost', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get item by ID
  getItemById: async (id) => {
    try {
      const response = await api.get(`/items/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Report found item
  reportFoundItem: async (itemData) => {
    try {
      const response = await api.post('/items/found', itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Report lost item
  reportLostItem: async (itemData) => {
    try {
      const response = await api.post('/items/lost', itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update item
  updateItem: async (id, itemData) => {
    try {
      const response = await api.put(`/items/${id}`, itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete item
  deleteItem: async (id) => {
    try {
      const response = await api.delete(`/items/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's items
  getMyItems: async () => {
    try {
      const response = await api.get('/items/my-items');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search items
  searchItems: async (query) => {
    try {
      const response = await api.get('/items/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
