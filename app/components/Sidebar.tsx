// src/components/Sidebar.tsx

import { FC } from 'react';
import Link from 'next/link';

const Sidebar: FC = () => {
  return (
    <nav className="bg-gray-800 text-white h-full p-4">
      <ul>
        <li><Link href="/admin/ads">Manage Ads</Link></li>
        <li><Link href="/admin/categories">Manage Categories</Link></li>
        <li><Link href="/admin/users">Manage Users</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Sidebar;
