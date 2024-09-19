// src/app/admin/page.tsx

import AdminLayout from '@/app/admin/layout';
import { FC } from 'react';
import Link from 'next/link';

const AdminDashboard: FC = () => {
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
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default AdminDashboard;
