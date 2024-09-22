'use client';

import { useEffect } from 'react';
import { useUser } from '../hooks/UserContext'; // Adjust the import path
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const { setUserRole } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      setUserRole(''); 
      router.push('/login'); 
    };

    handleLogout();
  }, [setUserRole, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Logging out...</h1>
      <p className="text-gray-600">Please wait...</p>
    </div>
  );
}
