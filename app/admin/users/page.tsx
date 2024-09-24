'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  numberOfPosts: number;
  roleId: number;
}

const ManageUsers: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/high/auth/admin/users', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();

          const usersArray: User[] = data.map((user: any) => ({
            id: user.userId, 
            name: `${user.firstName} ${user.lastName}`, 
            email: user.email,
            numberOfPosts: user.numberOfPosts,
            roleId: user.roleId ?? 0, 
          }));

          setUsers(usersArray);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch(`http://localhost:8080/api/high/auth/admin/users/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (res.ok) {
          setUsers(users.filter(user => user.id !== id));
        } else {
          setError('Failed to delete user');
        }
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/users/edit/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b font-semibold text-gray-700">ID</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Name</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Email</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Role</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border-b text-gray-700">{user.id}</td>
                <td className="p-3 border-b text-gray-700">{user.name}</td>
                <td className="p-3 border-b text-gray-700">{user.email}</td>
                <td className="p-3 border-b text-gray-700">{user.roleId}</td>
                <td className="p-3 border-b">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
