// src/routes/AppRoutes.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddPaymentPage from '../pages/AddPaymentPage';
import PaymentDetailsPage from '../pages/PaymentDetailsPage';
import UserListPage from '../pages/UserListPage';
import UserDetailsPage from '../pages/UserDetailsPage';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (user?.role !== 'admin' || user?.status !== 'active') {
    return <Navigate to="/login" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* redirect root -> home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Add payment */}
        <Route
          path="/payments/add"
          element={
            <PrivateRoute>
              <AddPaymentPage />
            </PrivateRoute>
          }
        />

        {/* Payment details */}
        <Route
          path="/payments/:id"
          element={
            <PrivateRoute>
              <PaymentDetailsPage />
            </PrivateRoute>
          }
        />

        {/* Edit payment */}
        <Route
          path="/payments/:id/edit"
          element={
            <PrivateRoute>
              <AddPaymentPage />
            </PrivateRoute>
          }
        />

        {/* User list */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserListPage />
            </PrivateRoute>
          }
        />

        {/* User details */}
        <Route
          path="/users/:id"
          element={
            <PrivateRoute>
              <UserDetailsPage />
            </PrivateRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
