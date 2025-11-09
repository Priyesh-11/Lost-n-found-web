import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/layout/Layout';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Feed from '../pages/Feed';
import Dashboard from '../pages/Dashboard';
import ReportItem from '../pages/ReportItem';
import ItemDetails from '../pages/ItemDetails';
import Profile from '../pages/Profile';
import MyClaims from '../pages/MyClaims';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="feed" element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            } />
            
            <Route path="item/:id" element={
              <ProtectedRoute>
                <ItemDetails />
              </ProtectedRoute>
            } />
            
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="report" element={
              <ProtectedRoute>
                <ReportItem />
              </ProtectedRoute>
            } />
            
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            <Route path="my-claims" element={
              <ProtectedRoute>
                <MyClaims />
              </ProtectedRoute>
            } />
          </Route>
          
          {/* 404 Not Found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
