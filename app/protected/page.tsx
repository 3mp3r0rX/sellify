'use client'

import { useEffect, useState } from 'react';

export default function ProtectedPage() {
  const [content, setContent] = useState<string | null>(null);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/protected-data');
      if (res.ok) {
        const data = await res.json();
        setContent(data.message);
      } else {
        setContent('Error loading data');
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Protected Page</h1>
      <p>{content}</p>
      <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  );
}
