import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('paririmbon_token') || null);
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('paririmbon_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (adminToken) {
      api.checkAdminSession(adminToken).catch(() => {
        logout();
      });
    }
  }, [adminToken]);

  const login = async (username, password) => {
    setAuthLoading(true);
    try {
      const res = await api.loginAdmin(username, password);
      setAdminToken(res.token);
      setAdminUser(res.user);
      localStorage.setItem('paririmbon_token', res.token);
      localStorage.setItem('paririmbon_user', JSON.stringify(res.user));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem('paririmbon_token');
    localStorage.removeItem('paririmbon_user');
  };

  return (
    <AuthContext.Provider
      value={{
        adminToken,
        adminUser,
        isAdmin: !!adminToken,
        authLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
