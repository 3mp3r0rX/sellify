"use client";

import { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  userRole: string;
  setUserRole: (role: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/user/role', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUserRole(data.role);
        } else {
          console.error('Failed to fetch user role');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
