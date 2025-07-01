
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user data on mount
    const savedUser = localStorage.getItem('bookBazaarUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock authentication - in real app, this would be an API call
      if (email === 'admin@bookbazaar.com' && password === 'admin123') {
        const userData = {
          id: '1',
          name: 'Admin User',
          email: 'admin@bookbazaar.com',
          role: 'admin' as const
        };
        setUser(userData);
        localStorage.setItem('bookBazaarUser', JSON.stringify(userData));
        return true;
      } else if (password === 'password123') {
        const userData = {
          id: '2',
          name: email.split('@')[0],
          email,
          role: 'user' as const
        };
        setUser(userData);
        localStorage.setItem('bookBazaarUser', JSON.stringify(userData));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock registration - in real app, this would be an API call
      const userData = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user' as const
      };
      setUser(userData);
      localStorage.setItem('bookBazaarUser', JSON.stringify(userData));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bookBazaarUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
