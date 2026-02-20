import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState } from 'react';

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  return (
    <div className="flex h-screen w-full">
      <aside className="md:block md:w-16 lg:w-64">
        <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      </aside>
      <div className="bg-primary flex h-full w-full flex-col">
        <div className="flex w-full items-center justify-end">
          <Navbar setIsMobileOpen={setIsMobileOpen} />
        </div>
        <main className="hide-scrollbar flex-1 overflow-x-hidden overflow-y-auto px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
