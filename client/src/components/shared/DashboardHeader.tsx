import type { User } from "../../types/types";

// components/shared/DashboardHeader.tsx
type Props = {
  user: User | null;
  onLogout: () => void;
  title?: string;
};

export default function DashboardHeader({ user, onLogout, title }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between">
      {/* Title */}
      <h1 className="flex-shrink text-lg sm:text-xl font-bold text-gray-800">
        {title || "Dashboard"}
      </h1>

      {/* Spacer on small */}
      <div className="flex-1" />

      {/* User info + logout */}
      <div className="flex-shrink-0 flex  space-x-3">
        {/* Hide email on very small screens */}
        <div className="flex flex-col space-x-3">
          <span className="hidden sm:inline-block text-lg text-gray-600 truncate max-w-xs">
            {user && user.name
              ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
              : "Guest"}
          </span>
          <span className="hidden sm:inline-block text-sm text-gray-600 truncate max-w-xs">
            {user?.email}
          </span>
        </div>
        <div className="justify-end flex">
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
