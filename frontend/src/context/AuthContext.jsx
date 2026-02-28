import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('tradelive_user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = (payload) => {
    localStorage.setItem('tradelive_token', payload.token);
    localStorage.setItem('tradelive_user', JSON.stringify(payload));
    setUser(payload);
  };

  const logout = () => {
    localStorage.removeItem('tradelive_token');
    localStorage.removeItem('tradelive_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
