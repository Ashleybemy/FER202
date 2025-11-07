import React, { createContext, useContext, useReducer } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

const PaymentContext = createContext();

const initialPaymentState = {
  payments: [],
  filters: {
    keyword: '',
    semester: '',
    course: '',
  },
  sort: {
    field: 'date',      // 'date' | 'courseName' | 'amount'
    direction: 'desc',  // 'asc' | 'desc'
  },
  totalAmount: 0,
  loading: false,
  error: null,
};

function calcTotalAmount(payments) {
  return payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
}

function paymentReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };

    case 'FETCH_SUCCESS': {
      const payments = action.payload || [];
      return {
        ...state,
        loading: false,
        payments,
        totalAmount: calcTotalAmount(payments),
      };
    }

    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'SET_SORT':
      return { ...state, sort: action.payload };

    case 'ADD_PAYMENT': {
      const payments = [...state.payments, action.payload];
      return { ...state, payments, totalAmount: calcTotalAmount(payments) };
    }

    case 'UPDATE_PAYMENT': {
      const payments = state.payments.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
      return { ...state, payments, totalAmount: calcTotalAmount(payments) };
    }

    case 'DELETE_PAYMENT': {
      const payments = state.payments.filter((p) => p.id !== action.payload);
      return { ...state, payments, totalAmount: calcTotalAmount(payments) };
    }

    default:
      return state;
  }
}

export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);
  const { user } = useAuth(); // user đang đăng nhập

  // Lấy payments theo user hiện tại
  const fetchPayments = async () => {
    if (!user?.id) {
      dispatch({ type: 'FETCH_SUCCESS', payload: [] });
      return;
    }

    dispatch({ type: 'FETCH_START' });
    try {
      const data = await api.getPaymentsByUser(user.id);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({
        type: 'FETCH_FAILURE',
        payload: err.message || 'Failed to load payments',
      });
    }
  };

  // CREATE
  const addPayment = async (payment) => {
    if (!user?.id) throw new Error('User not logged in');

    const payload = {
      ...payment,
      userId: user.id,                     // ghim userId hiện tại
      amount: Number(payment.amount) || 0, // đảm bảo là số
    };
    const created = await api.createPayment(payload);
    dispatch({ type: 'ADD_PAYMENT', payload: created });
    return created;
  };

  // UPDATE
  const updatePayment = async (id, payment) => {
    const payload = {
      ...payment,
      amount: Number(payment.amount) || 0,
    };
    const updated = await api.updatePayment(id, payload);
    dispatch({ type: 'UPDATE_PAYMENT', payload: updated });
    return updated;
  };

  // DELETE
  const deletePayment = async (id) => {
    await api.deletePayment(id);
    dispatch({ type: 'DELETE_PAYMENT', payload: id });
  };

  const value = {
    state,
    dispatch,
    fetchPayments,
    addPayment,
    updatePayment,
    deletePayment,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => useContext(PaymentContext);
