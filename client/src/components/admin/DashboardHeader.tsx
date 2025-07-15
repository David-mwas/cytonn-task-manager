import type { User } from "../../types/types";

type Props = {
  user: User | null; // User can be null if not logged in
  onLogout: () => void;
  onHamburgerClick: () => void;
  title: string;
};

export default function DashboardHeader({
  user,
  onHamburgerClick,
  title,
}: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50 flex flex-wrap items-center px-4 sm:px-6 py-3">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden text-gray-700 mr-3"
        onClick={onHamburgerClick}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      {/* Title */}
      <h1 className="flex-1 min-w-0 text-lg sm:text-xl font-bold text-gray-800 truncate">
        {title}
      </h1>
      <span className="inline-block text-lg text-gray-600 truncate max-w-xs md:hidden">
        {user && user.name
          ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
          : "Guest"}
      </span>
      {/* Spacer (only on small screens ensures wrap) */}
      <div className="w-full md:w-auto h-px md:hidden my-2 bg-gray-200" />

      {/* User info */}
      <div className="flex-shrink-0 flex  space-x-3 flex-col">
        <span className="hidden sm:inline-block text-lg text-gray-600 truncate max-w-xs">
          {user && user.name
            ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
            : "Guest"}
        </span>
        <span className="hidden sm:inline-block text-sm text-gray-600 truncate max-w-xs">
          {user?.email}
        </span>

        {/*
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
        */}
      </div>
    </header>
  );
}
