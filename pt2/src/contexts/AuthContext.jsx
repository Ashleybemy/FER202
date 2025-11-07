import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case 'RESTORE_SESSION':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case 'LOGOUT':
      return { ...initialState };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // khôi phục user từ localStorage nếu vẫn còn admin + active
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;
    try {
      const user = JSON.parse(stored);
      if (user.role === 'admin' && user.status === 'active') {
        dispatch({ type: 'RESTORE_SESSION', payload: user });
      } else {
        localStorage.removeItem('user');
      }
    } catch {
      localStorage.removeItem('user');
    }
  }, []);

  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const users = await api.getUsers();

      const user = users.find((u) => {
        const idMatch =
          u.username === usernameOrEmail || u.email === usernameOrEmail;
        return idMatch && u.password === password;
      });

      if (!user) {
        const msg = 'Invalid username or password!';
        dispatch({ type: 'LOGIN_FAILURE', payload: msg });
        return { success: false, error: msg };
      }

      // YÊU CẦU ĐỀ: chỉ admin + active được login vào dashboard
      if (user.role !== 'admin' || user.status !== 'active') {
        const msg = 'Tài khoản bị khóa, bạn không có quyền truy cập…';
        dispatch({ type: 'LOGIN_FAILURE', payload: msg });
        return { success: false, error: msg };
      }

      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return { success: true, user };
    } catch (err) {
      const msg = err.message || 'Login failed due to a network error.';
      dispatch({ type: 'LOGIN_FAILURE', payload: msg });
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
