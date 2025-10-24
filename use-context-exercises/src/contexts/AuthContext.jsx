// src/contexts/AuthContext.jsx
import React, {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useCallback,
} from 'react';

// ===== 1) Data mock để ngoài component (ổn định reference)
const MOCK_ACCOUNTS = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: '123456', role: 'admin', status: 'active' },
  { id: 2, username: 'user1', email: 'user1@example.com', password: '123456', role: 'user',  status: 'active' },
  { id: 3, username: 'user2', email: 'user2@example.com', password: '123456', role: 'user',  status: 'locked' },
];

// ===== 2) Context
const AuthContext = createContext(null);

// ===== 3) State
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// ===== 4) Reducer
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, loading: false, error: null, isAuthenticated: true };
    case 'LOGIN_FAILURE':
      return { ...state, user: null, loading: false, error: action.payload ?? 'Login failed', isAuthenticated: false };
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null, isAuthenticated: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

// ===== 5) Provider
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // CLEAR ERROR (ổn định reference)
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // LOGOUT (ổn định reference)
  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  // LOGIN (ổn định reference)
  const login = useCallback((identifier, password) => {
    const id = (identifier ?? '').trim();
    const pw = (password ?? '').trim();

    dispatch({ type: 'LOGIN_START' });

    return new Promise((resolve) => {
      setTimeout(() => {
        if (!id || !pw) {
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Missing credentials.' });
          resolve({ ok: false, message: 'Missing credentials.' });
          return;
        }

        const isEmail = id.includes('@');
        const account = MOCK_ACCOUNTS.find((acc) =>
          isEmail
            ? acc.email === id && acc.password === pw
            : acc.username === id && acc.password === pw
        );

        if (!account) {
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials.' });
          resolve({ ok: false, message: 'Invalid credentials.' });
          return;
        }

        if (account.status === 'locked') {
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Account is locked. Please contact administrator.' });
          resolve({ ok: false, message: 'Account is locked. Please contact administrator.' });
          return;
        }

        if (account.role !== 'admin') {
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Access denied. Only admin users can login' });
          resolve({ ok: false, message: 'Access denied. Only admin users can login' });
          return;
        }

        const userInfo = {
          id: account.id,
          username: account.username,
          email: account.email,
          role: account.role,
          status: account.status,
        };

        dispatch({ type: 'LOGIN_SUCCESS', payload: userInfo });
        resolve({ ok: true, account: userInfo });
      }, 600);
    });
  }, []); // không phụ thuộc gì khác

  // VALUE (ổn định reference + đúng deps)
  const contextValue = useMemo(
    () => ({
      user: state.user,
      loading: state.loading,
      error: state.error,
      isAuthenticated: state.isAuthenticated,
      login,
      logout,
      clearError,
    }),
    [state, login, logout, clearError]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// ===== 6) Hook
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export default AuthContext;
