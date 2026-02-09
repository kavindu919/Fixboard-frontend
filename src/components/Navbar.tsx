import { PiBellSimpleRingingThin, PiUser } from "react-icons/pi";

const Navbar = () => {
  return (
    <header className="flex h-14 w-full flex-row items-center justify-between px-4 md:h-16 lg:h-20">
      <div className="flex flex-row items-center space-x-1">
        <button
          aria-label="Notifications"
          className="flex items-center justify-center rounded-full bg-moonstone p-2"
        >
          <PiBellSimpleRingingThin className="h-4 w-4 text-black md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </button>
        <button
          aria-label="profile-section"
          className="flex items-center justify-center rounded-full bg-moonstone p-2"
        >
          <PiUser className="h-4 w-4 text-black md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
