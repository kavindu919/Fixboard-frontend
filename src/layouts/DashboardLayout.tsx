import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <aside className="hidden bg-cream md:block md:w-16 lg:w-64">
        <Sidebar />
      </aside>
      <div className="flex h-full w-full flex-col bg-white">
        <Navbar />
        <main className="flex-1 overflow-auto px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
