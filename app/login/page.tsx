'use client';

import { useState } from 'react';
import { useUser } from '../components/UserContext'; // Adjust the import path
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { setUserRole } = useUser(); // Get the setUserRole function from context
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setSuccess('Login successful!');

      // Fetch the user role
      const roleRes = await fetch('http://localhost:8080/api/user/role', {
        credentials: 'include',
      });

      if (roleRes.ok) {
        const data = await roleRes.json();
        setUserRole(data.role); 
        router.push('/');
      } else {
        setError('Failed to retrieve user role');
      }
    
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
}
