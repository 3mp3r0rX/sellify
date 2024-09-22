'use client';

import { notFound } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

const CategoryPage: FC<{ params: { slug: string } }> = ({ params }) => {
    const { slug } = params;
    const [posts, setPosts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPostsByCategory = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/categories/${slug}`);
                if (!res.ok) {
                    console.error(`Failed to fetch posts: ${res.status}`);
                    notFound();
                    return;
                }
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error(`Error fetching posts: ${err}`);
                setError('Failed to load posts.');
            }
        };

        fetchPostsByCategory();
    }, [slug]);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-12">
            <h1 className="text-5xl font-bold text-gray-900">Posts in {slug} Category</h1>

            <div className="mt-6">
                <Link href="/post-ad">
                    <button className="px-5 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-800 transition duration-300">
                        Post Your Ad
                    </button>
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center mt-8 w-full max-w-6xl mx-auto">
                {error && <p className="text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <div key={index} className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white p-6 transition-transform transform hover:scale-105">
                                <img
                                    className="w-full h-48 object-cover mb-4"
                                    src={post.image ? `data:image/jpeg;base64,${post.image}` : 'https://via.placeholder.com/400x300'}
                                    alt={post.title}
                                />
                                <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                                <p className="text-gray-500 mt-1">Posted by: {post.userName}</p>
                                <p className="text-gray-700 mt-1">{post.description}</p>
                                <p className="font-bold text-gray-800">Category: {post.category_name}</p>
                                <p className="font-bold text-gray-800">Price: ${post.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-500">
                                    Posted on: {new Date(post.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No posts available in this category.</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default CategoryPage;
