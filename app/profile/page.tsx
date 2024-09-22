'use client';

import { useState, useEffect } from 'react';

interface User {
  email: string;
  username: string;
  created_at: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('http://localhost:8080/api/user/profile', {
        credentials: 'include',
      });
      const data: User = await res.json(); 
      setUser(data);
      setEmail(data.email);
    }

    fetchUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to update user');

      const updatedUser: User = await res.json(); 
      setUser(updatedUser);
      setError('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Profile Page</h1>
      {user ? (
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <p className="text-lg font-medium">Email: <span className="font-normal">{user.email}</span></p>
            <p className="text-lg font-medium">Username: <span className="font-normal">{user.username}</span></p>
            <p className="text-lg font-medium">Created at: <span className="font-normal">{new Date(user.created_at).toLocaleDateString()}</span></p>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Update Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="mt-2 w-full bg-blue-600 text-white p-2 rounded transition duration-200 hover:bg-blue-700 focus:outline-none"
            >
              Update
            </button>
          </form>
        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
}
