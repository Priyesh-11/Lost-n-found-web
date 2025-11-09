// import api from './api';

// export const itemService = {
//   // Get all found items
//   getFoundItems: async (params = {}) => {
//     try {
//       const response = await api.get('/items/found', { params });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Get all lost items
//   getLostItems: async (params = {}) => {
//     try {
//       const response = await api.get('/items/lost', { params });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Get item by ID
//   getItemById: async (id) => {
//     try {
//       const response = await api.get(`/items/${id}`);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Report found item
//   reportFoundItem: async (itemData) => {
//     try {
//       const response = await api.post('/items/found', itemData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Report lost item
//   reportLostItem: async (itemData) => {
//     try {
//       const response = await api.post('/items/lost', itemData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Update item
//   updateItem: async (id, itemData) => {
//     try {
//       const response = await api.put(`/items/${id}`, itemData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Delete item
//   deleteItem: async (id) => {
//     try {
//       const response = await api.delete(`/items/${id}`);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Get user's items
//   getMyItems: async () => {
//     try {
//       const response = await api.get('/items/my-items');
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Search items
//   searchItems: async (query) => {
//     try {
//       const response = await api.get('/items/search', { params: { q: query } });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },
// };


import api from './api';

// DEV MODE: Enable mock data
const DEV_MODE = true;

// Mock data for testing
const mockFoundItems = [
  {
    id: 1,
    title: 'Blue Nike Backpack',
    description: 'Found near library, contains notebooks and a water bottle. Has a small tear on the right strap.',
    category: 'Bags',
    location_found: 'Library 2nd Floor',
    date_found: '2025-11-05',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    status: 'available',
    user_id: 2,
    how_found: 'Found on study desk near window',
    finder_name: 'John Doe'
  },
  {
    id: 2,
    title: 'iPhone 13 Pro - Black',
    description: 'Black iPhone with cracked screen protector. Has a blue case with stickers.',
    category: 'Electronics',
    location_found: 'Cafeteria Table 12',
    date_found: '2025-11-07',
    image_url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=300&fit=crop',
    status: 'available',
    user_id: 3,
    how_found: 'Left on cafeteria table',
    finder_name: 'Sarah Smith'
  },
  {
    id: 3,
    title: 'Calculus Textbook',
    description: 'Advanced Calculus textbook with handwritten notes inside. Owner name might be on first page.',
    category: 'Books',
    location_found: 'Classroom 205',
    date_found: '2025-11-08',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    status: 'available',
    user_id: 2,
    how_found: 'Left under desk'
  },
  {
    id: 4,
    title: 'Black Leather Wallet',
    description: 'Black leather wallet with credit card slots. Contains some cash and cards.',
    category: 'Wallets',
    location_found: 'Parking Lot B',
    date_found: '2025-11-06',
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop',
    status: 'claimed',
    user_id: 4,
    how_found: 'Found near car'
  },
  {
    id: 5,
    title: 'AirPods Pro',
    description: 'White AirPods Pro in charging case. Case has minor scratches.',
    category: 'Electronics',
    location_found: 'Gym Locker Room',
    date_found: '2025-11-04',
    image_url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=300&fit=crop',
    status: 'available',
    user_id: 1,
    how_found: 'Found on bench'
  },
  {
    id: 6,
    title: 'Red Water Bottle',
    description: 'Stainless steel red water bottle with campus logo sticker.',
    category: 'Accessories',
    location_found: 'Basketball Court',
    date_found: '2025-11-08',
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
    status: 'available',
    user_id: 2
  }
];

const mockLostItems = [
  {
    id: 7,
    title: 'Student ID Card - EN12345',
    description: 'Lost my student ID card. Enrollment number EN12345, photo of male student.',
    category: 'ID Cards',
    location_lost: 'Main Building Entrance',
    date_lost: '2025-11-06',
    status: 'available',
    user_id: 1
  },
  {
    id: 8,
    title: 'Silver Car Keys',
    description: 'Toyota car keys with blue keychain. Has library card attached.',
    category: 'Keys',
    location_lost: 'Library Parking',
    date_lost: '2025-11-07',
    status: 'available',
    user_id: 1
  }
];

export const itemService = {
  // Get all found items
  getFoundItems: async (params = {}) => {
    if (DEV_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter by category if provided
      let items = [...mockFoundItems];
      if (params.category) {
        items = items.filter(item => item.category === params.category);
      }
      
      return { items };
    }
    
    try {
      const response = await api.get('/items/found', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all lost items
  getLostItems: async (params = {}) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let items = [...mockLostItems];
      if (params.category) {
        items = items.filter(item => item.category === params.category);
      }
      
      return { items };
    }
    
    try {
      const response = await api.get('/items/lost', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get item by ID
  getItemById: async (id) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const allItems = [...mockFoundItems, ...mockLostItems];
      const item = allItems.find(item => item.id === parseInt(id));
      return { item };
    }
    
    try {
      const response = await api.get(`/items/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Report found item
  reportFoundItem: async (itemData) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { 
        message: 'Item reported successfully',
        item: { id: Date.now(), ...itemData }
      };
    }
    
    try {
      const response = await api.post('/items/found', itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Report lost item
  reportLostItem: async (itemData) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { 
        message: 'Item reported successfully',
        item: { id: Date.now(), ...itemData }
      };
    }
    
    try {
      const response = await api.post('/items/lost', itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's items
  getMyItems: async () => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 400));
      return {
        found: [mockFoundItems[4]], // AirPods Pro
        lost: mockLostItems
      };
    }
    
    try {
      const response = await api.get('/items/my-items');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update item (placeholder)
  updateItem: async (id, itemData) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { message: 'Item updated successfully' };
    }
    
    try {
      const response = await api.put(`/items/${id}`, itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete item
  deleteItem: async (id) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { message: 'Item deleted successfully' };
    }
    
    try {
      const response = await api.delete(`/items/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search items (placeholder)
  searchItems: async (query) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 400));
      const allItems = [...mockFoundItems, ...mockLostItems];
      const results = allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      return { items: results };
    }
    
    try {
      const response = await api.get('/items/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
