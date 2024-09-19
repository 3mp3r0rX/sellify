// src/app/admin/layout.tsx

import { FC } from 'react';
import Sidebar from '../components/Sidebar';

const AdminLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
