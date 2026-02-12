import { LuActivity, LuFilePlus, LuLayers, LuListTodo } from 'react-icons/lu';
import { VscDashboard } from 'react-icons/vsc';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navLinks = [
    {
      label: 'Dashboard',
      icon: VscDashboard,
      path: '/dashboard',
    },
    {
      label: 'All Issues',
      icon: LuLayers,
      path: '/dashboard/issues',
    },
    {
      label: 'My Issues',
      icon: LuListTodo,
      path: '/comming-soon',
    },
    {
      label: 'Reported by Me',
      icon: LuFilePlus,
      path: '/comming-soon',
    },

    {
      label: 'Activity Feed',
      icon: LuActivity,
      path: '/comming-soon',
    },
  ];
  const { pathname } = useLocation();
  return (
    <aside className="flex h-screen w-full flex-col items-center justify-start border-r shadow-2xl">
      <div className="flex h-16 w-full items-center justify-center">Logo</div>
      <nav className="mt-6 flex w-full flex-col space-y-1 px-3">
        {navLinks.map((item, key) => {
          const Icon = item.icon;

          return (
            <Link
              key={key}
              to={item.path}
              className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-[#F8FAFC] ${pathname === item.path ? 'bg-accent' : 'hover:bg-accent hover:text-primary transition-colors'} `}
            >
              <Icon className="h-4 w-4 text-[#F8FAFC] md:h-5 md:w-5 lg:h-6 lg:w-6" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
