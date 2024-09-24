'use client';

import { useState, useEffect } from 'react';
import Loading from '../components/Loading';

interface Post {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

interface User {
  firstName: string;
  lastName: string;
  avatar: string; 
  userId: number;
  email: string;
  createdAt: string;
  posts: Post[]; 
  numberOfPosts: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await fetch('http://localhost:8080/api/user/profile', {
          credentials: 'include',
        });
        const userData: User = await userRes.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center p-4 max-w-lg mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Profile</h1>
          {user ? (
            <div className="w-full bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                {user.avatar && (
                  <img 
                    src={`data:image/jpeg;base64,${user.avatar}`}  
                    alt={`${user.firstName} ${user.lastName}'s profile picture`} 
                    className="w-16 h-16 rounded-full mr-4" 
                  />
                )}
                <div>
                  <p className="text-lg font-medium">Name: <span className="font-normal">{`${user.firstName} ${user.lastName}`}</span></p>
                  <p className="text-lg font-medium">Email: <span className="font-normal">{user.email}</span></p>
                  <p className="text-lg font-medium">Joined on: <span className="font-normal">{new Date(user.createdAt).toLocaleDateString()}</span></p>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-4">Your Posts:</h2>
              {user.posts && user.posts.length > 0 ? ( 
                <ul className="space-y-2">
                  {user.posts.map((post) => (
                    <li key={post.id} className="p-4 border border-gray-300 rounded-md">
                      <h3 className="font-bold">{post.title}</h3>
                      <p>{post.description}</p>
                      <p className="text-gray-500 text-sm">Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No posts yet.</p>
              )}
            </div>
          ) : (
            <p className="text-gray-600">No user data available.</p>
          )}
        </div>
      )}
    </>
  );
}
