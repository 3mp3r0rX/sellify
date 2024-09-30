'use client';

import { useState, useEffect } from 'react';
import Loading from '../components/Loading';

interface Post {
  id: number;
  title: string;
  description: string;
  createdAt: number; // Unix timestamp
}

interface User {
  firstName: string;
  lastName: string;
  avatar: string;
  userId: number;
  email: string;
  createdAt: number; // Unix timestamp
  posts: Post[];
  numberOfPosts: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState<number | null>(null); // Track which post is being edited
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

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

  // Handle delete post
  const handleDeletePost = async (postId: number) => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:8080/api/posts/${postId}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (res.ok) {
          setUser((prevUser) => {
            if (!prevUser) return null;
            return {
              ...prevUser,
              posts: prevUser.posts.filter((post) => post.id !== postId),
            };
          });
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  // Handle edit post
  const handleEditPost = (post: Post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditDescription(post.description);
  };

  // Handle save edited post
  const handleSavePost = async (postId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      });

      if (res.ok) {
        const updatedPost = await res.json();
        setUser((prevUser) => {
          if (!prevUser) return null;
          return {
            ...prevUser,
            posts: prevUser.posts.map((post) =>
              post.id === postId ? updatedPost : post
            ),
          };
        });
        setEditingPostId(null);
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">My Profile</h1>
          {user ? (
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
              <div className="flex items-center mb-6 border-b pb-4">
                {user.avatar && (
                  <img
                    src={`data:image/jpeg;base64,${user.avatar}`}
                    alt={`${user.firstName} ${user.lastName}'s profile picture`}
                    className="w-24 h-24 rounded-full border-4 border-blue-400 mr-6"
                  />
                )}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {`${user.firstName} ${user.lastName}`}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-500">
                    Joined: {new Date(user.createdAt * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Your Listings</h3>
              {user.posts && user.posts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.posts.map((post) => (
                    <div key={post.id} className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
                      {editingPostId === post.id ? (
                        <div>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                          />
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                          />
                          <button
                            onClick={() => handleSavePost(post.id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingPostId(null)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-bold text-lg">{post.title}</h4>
                          <p className="text-gray-600">{post.description}</p>
                          <p className="text-gray-400 text-xs">
                            Posted: {new Date(post.createdAt * 1000).toLocaleDateString()}
                          </p>
                          <div className="flex justify-between mt-2">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
