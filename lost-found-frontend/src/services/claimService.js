// import api from './api';

// export const claimService = {
//   // Submit a claim
//   createClaim: async (claimData) => {
//     try {
//       const response = await api.post('/claims', claimData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Get user's claims
//   getMyClaims: async () => {
//     try {
//       const response = await api.get('/claims/my-claims');
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Get claims for user's items
//   getClaimsForMyItems: async () => {
//     try {
//       const response = await api.get('/claims/received');
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Update claim status
//   updateClaimStatus: async (claimId, status) => {
//     try {
//       const response = await api.put(`/claims/${claimId}`, { status });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   // Get claim by ID
//   getClaimById: async (claimId) => {
//     try {
//       const response = await api.get(`/claims/${claimId}`);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },
// };


import api from './api';

const DEV_MODE = true;

const mockClaims = [
  {
    id: 1,
    item_id: 1,
    item_title: 'Blue Nike Backpack',
    claimer_id: 1,
    claimer_name: 'Test User',
    verification_details: 'My backpack has a Physics textbook and a red notebook inside. The zipper on the main compartment is slightly broken.',
    status: 'pending',
    claimed_at: '2025-11-08T10:30:00'
  }
];

export const claimService = {
  // Submit a claim
  createClaim: async (claimData) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return {
        message: 'Claim submitted successfully',
        claim: { id: Date.now(), ...claimData, status: 'pending' }
      };
    }
    
    try {
      const response = await api.post('/claims', claimData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's claims
  getMyClaims: async () => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 400));
      return { claims: mockClaims };
    }
    
    try {
      const response = await api.get('/claims/my-claims');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get claims for user's items
  getClaimsForMyItems: async () => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 400));
      return { claims: [] };
    }
    
    try {
      const response = await api.get('/claims/received');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update claim status
  updateClaimStatus: async (claimId, status) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { message: 'Claim status updated' };
    }
    
    try {
      const response = await api.put(`/claims/${claimId}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get claim by ID
  getClaimById: async (claimId) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { claim: mockClaims[0] };
    }
    
    try {
      const response = await api.get(`/claims/${claimId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
