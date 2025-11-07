// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ================= USERS =================
export const getUsers = async () => {
  const res = await API.get('/users');
  return res.data;
};

export const getUserById = async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};

export const updateUser = async (id, user) => {
  const res = await API.put(`/users/${id}`, user);
  return res.data;
};

// ================= PAYMENTS ==============
export const getPayments = async () => {
  const res = await API.get('/payments');
  return res.data;
};

export const getPaymentById = async (id) => {
  const res = await API.get(`/payments/${id}`);
  return res.data;
};

export const getPaymentsByUser = async (userId) => {
  const res = await API.get('/payments', {
    params: { userId },
  });
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
