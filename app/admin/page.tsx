'use client'; // Since this uses client-side rendering

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For programmatic navigation (redirection)
import Link from 'next/link';

const AdminDashboard: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Function to check if the user is authorized
    const checkAuthorization = async () => {
      const res = await fetch('http://localhost:8080/admin', {
        credentials: 'include', // Include cookies for authentication
      });

      if (res.status === 401) {
        // If not authorized, redirect to unauthorized page
        router.push('/unauthorized');
      } else {
        // Authorized, proceed to show the page
        setIsAuthorized(true);
      }
      setIsLoading(false);
    };

    checkAuthorization();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>; // Show a loading state
  }

  if (!isAuthorized) {
    return null; // Optionally, show a fallback if unauthorized
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/ads" legacyBehavior>
          <a className="bg-white p-4 rounded shadow hover:bg-gray-50 transition">
            <h2 className="text-xl font-semibold mb-2">Manage Ads</h2>
            <p>View and manage all ads posted on Sellify.</p>
          </a>
        </Link>
        <Link href="/admin/categories" legacyBehavior>
          <a className="bg-white p-4 rounded shadow hover:bg-gray-50 transition">
            <h2 className="text-xl font-semibold mb-2">Manage Categories</h2>
            <p>Add, edit, or delete categories.</p>
          </a>
        </Link>
        <Link href="/admin/users" legacyBehavior>
          <a className="bg-white p-4 rounded shadow hover:bg-gray-50 transition">
            <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
            <p>View and manage all users of Sellify.</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
