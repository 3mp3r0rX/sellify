
"use client";

import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({ userRole: '', setUserRole: (role: string) => {} });

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const checkAuthStatus = async () => {
      const res = await fetch('http://localhost:8080/api/user/role', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setUserRole(data.role);
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

export const useUser = () => useContext(UserContext);
