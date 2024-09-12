'use client'

import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/user');
      const data = await res.json();
      setUser(data);
    }

    fetchUser();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          {/* Add form or options to update user details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
