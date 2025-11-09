import api from './api';

export const claimService = {
  // Submit a claim
  createClaim: async (claimData) => {
    try {
      const response = await api.post('/claims', claimData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's claims
  getMyClaims: async () => {
    try {
      const response = await api.get('/claims/my-claims');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get claims for user's items
  getClaimsForMyItems: async () => {
    try {
      const response = await api.get('/claims/received');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update claim status
  updateClaimStatus: async (claimId, status) => {
    try {
      const response = await api.put(`/claims/${claimId}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get claim by ID
  getClaimById: async (claimId) => {
    try {
      const response = await api.get(`/claims/${claimId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
