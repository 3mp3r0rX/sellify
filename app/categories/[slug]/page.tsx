'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

const CategoryPage: FC<{ params: { slug: string } }> = ({ params }) => {
  const { slug } = params;
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Set the number of posts per page

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/categories/${slug}`);
        
        if (!res.ok) {
          console.error(`Failed to fetch posts: ${res.status}`);
          setError(`Failed to load posts for category ${slug}. Status: ${res.status}`);
          return;
        }

        const data = await res.json();
        console.log('Fetched data:', data); 

        const postArray = Object.values(data)[0]; 

        if (Array.isArray(postArray) && postArray.length > 0) {
          setPosts(postArray);
        } else {
          console.log('No posts available in the fetched data.');
        }
      } catch (err) {
        console.error(`Error fetching posts: ${err}`);
        setError('Failed to load posts.');
      }
    };

    fetchPostsByCategory();
  }, [slug]);

  // Calculate current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12">
      <h1 className="text-5xl font-bold text-gray-900">Posts in {slug} Category</h1>
      <div className="flex flex-col items-center justify-center mt-8 w-full max-w-6xl mx-auto">
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {currentPosts.length > 0 ? (
            currentPosts.map((post, index) => {
              console.log('Post data:', post); 
              return (
                <div
                  key={index}
                  className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white p-6 transition-transform transform hover:scale-105"
                >
                  {post.images.length > 0 ? (
                    <img
                      className="w-full h-48 object-cover mb-4"
                      src={`data:image/jpeg;base64,${post.images[0].imageData}`} 
                      alt={post.title}
                    />
                  ) : (
                    <img
                      className="w-full h-48 object-cover mb-4"
                      src="https://via.placeholder.com/400x300"
                      alt="No image available"
                    />
                  )}
                  <Link href={`/ad/${post.postId}`}>
                    <h3 className="text-xl font-bold text-gray-900">{post.title || 'No Title'}</h3>
                    <p className="text-gray-500 mt-1">Posted by: {post.userId || 'Unknown'}</p>
                    <p className="text-gray-700 mt-1">{post.content || 'No Description'}</p>
                    <p className="font-bold text-gray-800">Category: {post.categoryName || 'No Category'}</p>
                    <p className="font-bold text-gray-800">Price: {post.price ? `$${post.price.toFixed(2)}` : 'No Price'}</p>
                    <p className="text-sm text-gray-500">
                      Posted on: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown Date'}
                    </p>
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600 text-center">No posts available in this category.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <nav className="mb-4 flex justify-center space-x-4 pt-12" aria-label="Pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center rounded-lg border border-teal-500 px-3 py-2 text-gray-700 transition-colors duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-500 hover:text-white'}`}
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <span key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={`cursor-pointer rounded-lg border border-teal-500 px-4 py-2 text-gray-700 transition-colors duration-300 ${currentPage === pageNumber ? 'bg-teal-500 text-white' : 'hover:bg-teal-100'}`}>
                {pageNumber}
              </span>
            );
          })}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center rounded-lg border border-teal-500 px-3 py-2 text-gray-700 transition-colors duration-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-500 hover:text-white'}`}
          >
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </main>
  );
};

export default CategoryPage;
