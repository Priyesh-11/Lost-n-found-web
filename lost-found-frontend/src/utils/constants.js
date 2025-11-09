export const CATEGORIES = [
  'Electronics',
  'Documents',
  'Clothing',
  'Books',
  'Accessories',
  'Keys',
  'Bags',
  'Wallets',
  'ID Cards',
  'Others',
];

export const ITEM_STATUS = {
  AVAILABLE: 'available',
  CLAIMED: 'claimed',
  RETURNED: 'returned',
};

export const CLAIM_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FEED: '/feed',
  DASHBOARD: '/dashboard',
  REPORT: '/report',
  PROFILE: '/profile',
  MY_CLAIMS: '/my-claims',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    PROFILE: '/auth/profile',
  },
  ITEMS: {
    FOUND: '/items/found',
    LOST: '/items/lost',
    MY_ITEMS: '/items/my-items',
    SEARCH: '/items/search',
  },
  CLAIMS: {
    CREATE: '/claims',
    MY_CLAIMS: '/claims/my-claims',
    RECEIVED: '/claims/received',
  },
};

export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful!',
    REGISTER: 'Registration successful! Please login.',
    ITEM_REPORTED: 'Item reported successfully!',
    CLAIM_SUBMITTED: 'Claim submitted successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
  },
  ERROR: {
    LOGIN_FAILED: 'Login failed. Please check your credentials.',
    REGISTER_FAILED: 'Registration failed. Please try again.',
    FETCH_FAILED: 'Failed to load data. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
  },
};
