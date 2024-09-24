'use client';

import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Swal from 'sweetalert2'; 

interface User {
  email: string;
  username: string;
  created_at: string;
}

export default function ProfileSettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('http://localhost:8080/api/user/profile', {
        credentials: 'include',
      });
      const data: User = await res.json();
      setUser(data);
      setEmail(data.email);
      setLoading(false);
    }

    fetchUser();
  }, []);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/user/settings/email', {
        credentials: 'include',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to update email');
      setError('');
      Swal.fire('Success!', 'Your email has been updated.', 'success'); 
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      Swal.fire('Error!', errorMessage, 'error'); 
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      Swal.fire('Error!', 'Passwords do not match', 'error'); 
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/user/settings/password', {
        credentials: 'include',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!res.ok) throw new Error('Failed to update password');
      setError('');
      Swal.fire('Success!', 'Your password has been updated.', 'success'); 
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      Swal.fire('Error!', errorMessage, 'error');
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleProfilePicUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (profilePic) {
      formData.append('avatar', profilePic);
    }

    try {
      const res = await fetch('http://localhost:8080/api/user/settings/avatar', {
        credentials: 'include',
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update profile picture');
      setError('');
      Swal.fire('Success!', 'Your profile picture has been updated.', 'success'); 
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      Swal.fire('Error!', errorMessage, 'error'); 
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (confirmed.isConfirmed) {
      try {
        const res = await fetch('http://localhost:8080/api/user', {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to delete account');
        Swal.fire('Deleted!', 'Your account has been deleted.', 'success'); 
      } catch (err) {
        const errorMessage = (err as Error).message;
        setError(errorMessage);
        Swal.fire('Error!', errorMessage, 'error'); 
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center p-6 max-w-lg mx-auto shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold mb-6 text-center">Profile Settings</h1>
          {user ? (
            <div className="w-full bg-white shadow-md rounded-lg p-6 space-y-6">
              <div className="mb-4">
                <p className="text-lg font-medium">Email: <span className="font-normal">{user.email}</span></p>
                <p className="text-lg font-medium">Username: <span className="font-normal">{user.username}</span></p>
              </div>

              <form onSubmit={handleUpdateEmail} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Update Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg transition duration-200 hover:bg-blue-700 focus:outline-none"
                >
                  Update Email
                </button>
              </form>

              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">New Password:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg transition duration-200 hover:bg-blue-700 focus:outline-none"
                >
                  Change Password
                </button>
              </form>

              <form onSubmit={handleProfilePicUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Upload Profile Picture:</label>
                  <input
                    type="file"
                    onChange={handleProfilePicChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg transition duration-200 hover:bg-blue-700 focus:outline-none"
                >
                  Upload
                </button>
              </form>

              <button
                onClick={handleDeleteAccount}
                className="mt-4 w-full bg-red-600 text-white p-3 rounded-lg transition duration-200 hover:bg-red-700 focus:outline-none"
              >
                Delete Account
              </button>
            </div>
          ) : (
            <p className="text-gray-600">Loading...</p>
          )}
        </div>
      )}
    </>
  );
}
