'use client'


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const EditUserPage = () => {
  const params = useParams();  // Use useParams to get route parameters
  const router = useRouter();
  const { id } = params;  // Get user ID from URL
  const [user, setUser] = useState<any>(null);  // State to hold user data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`/api/users/${id}`);
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          } else {
            setError('Failed to fetch user');
          }
        } catch (err) {
          setError('Failed to fetch user');
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        router.push('/admin/users');  // Redirect to users list page
      } else {
        setError('Failed to update user');
      }
    } catch (err) {
      setError('Failed to update user');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Edit User</h1>
      {user && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={user.name || ''}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={user.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUserPage;
