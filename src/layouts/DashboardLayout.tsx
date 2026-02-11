import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <aside className="hidden bg-[#1E293B] md:block md:w-16 lg:w-64">
        <Sidebar />
      </aside>
      <div className="bg-primary flex h-full w-full flex-col">
        <div className="flex w-full items-center justify-end">
          <Navbar />
        </div>
        <main className="hide-scrollbar flex-1 overflow-x-hidden overflow-y-auto px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
