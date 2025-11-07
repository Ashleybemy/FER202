// src/services/api.js
import axios from 'axios';

// Cấu hình Base URL cho JSON Server (port 3001 như file hướng dẫn)
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ====== AUTH ======
export const getUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// ====== PAYMENTS ======
export const getPayments = async () => {
  const res = await API.get('/payments');
  return res.data;
};

// Lấy thanh toán theo userId (ưu tiên dùng cái này)
export const getPaymentsByUser = async (userId) => {
  const res = await API.get('/payments', { params: { userId } });
  return res.data;
};

export const createPayment = async (payment) => {
  const res = await API.post('/payments', payment);
  return res.data;
};

export const updatePayment = async (id, payment) => {
  const res = await API.put(`/payments/${id}`, payment);
  return res.data;
};

export const deletePayment = async (id) => {
  await API.delete(`/payments/${id}`);
};
