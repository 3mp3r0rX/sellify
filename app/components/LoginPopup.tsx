'use client';

import { useState } from 'react';
import { useUser } from '../hooks/UserContext'; 
import { useRouter } from 'next/navigation';

const LoginPopup = ({ onClose, onSuccess } : any) => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUserRole } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const roleRes = await fetch('http://localhost:8080/api/user/role', {
        credentials: 'include',
      });

      if (roleRes.ok) {
        const data = await roleRes.json();
        setUserRole(data.role);
        onSuccess(data.role); 
        onClose();
        router.push('/post-ad');
      } else {
        setError('Failed to retrieve user role');
      }
    } else {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 w-full mb-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 w-full mb-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button 
            type="submit" 
            className="bg-purple-500 text-white py-2 px-4 rounded-lg w-full hover:bg-purple-800 transition duration-200"
          >
            Login
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500 hover:text-gray-700 transition duration-200">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
