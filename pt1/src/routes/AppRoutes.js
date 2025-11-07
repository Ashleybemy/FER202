import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddPaymentPage from '../pages/AddPaymentPage';
import PaymentDetailsPage from '../pages/PaymentDetailsPage';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Trang mặc định */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard (protected) */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Add new payment */}
        <Route
          path="/payments/new"
          element={
            <PrivateRoute>
              <AddPaymentPage />
            </PrivateRoute>
          }
        />

        {/* View details */}
        <Route
          path="/payments/:id"
          element={
            <PrivateRoute>
              <PaymentDetailsPage />
            </PrivateRoute>
          }
        />

        {/* Edit payment (dùng lại AddPaymentPage ở edit mode) */}
        <Route
          path="/payments/:id/edit"
          element={
            <PrivateRoute>
              <AddPaymentPage />
            </PrivateRoute>
          }
        />

        {/* Route khác → về home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
