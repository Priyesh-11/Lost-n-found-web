// import { createContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check for existing token on mount
//     const initAuth = () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const decoded = jwtDecode(token);
          
//           // Check if token is expired
//           if (decoded.exp * 1000 < Date.now()) {
//             localStorage.removeItem('token');
//             setUser(null);
//           } else {
//             setUser(decoded);
//           }
//         } catch (error) {
//           console.error('Invalid token:', error);
//           localStorage.removeItem('token');
//           setUser(null);
//         }
//       }
//       setLoading(false);
//     };

//     initAuth();
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     const decoded = jwtDecode(token);
//     setUser(decoded);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   const updateUser = (userData) => {
//     setUser(prev => ({ ...prev, ...userData }));
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     updateUser,
//     isAuthenticated: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // DEVELOPMENT MODE: Auto-login with fake user
  const DEV_MODE = true; // Set to false when backend is ready
  
  // Create a fake logged-in user for testing
  const [user, setUser] = useState(DEV_MODE ? {
    id: 1,
    name: 'Test User',
    enrollment_number: 'EN001',
    email: 'test@college.edu',
    phone: '9876543210'
  } : null);
  
  const [loading, setLoading] = useState(false); // No loading in dev mode

  const login = (token) => {
    // Mock login - just set a fake user
    setUser({
      id: 1,
      name: 'Test User',
      enrollment_number: 'EN001',
      email: 'test@college.edu',
      phone: '9876543210'
    });
  };

  const logout = () => {
    setUser(null);
    // Optionally redirect to login
    window.location.href = '/login';
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
