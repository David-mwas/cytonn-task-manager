// components/shared/DashboardHeader.tsx
type Props = {
  user: { email?: string } | null;
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
      <div className="flex-shrink-0 flex items-center space-x-3">
        {/* Hide email on very small screens */}
        <span className="hidden sm:inline-block text-sm text-gray-600 truncate max-w-xs">
          {user?.email}
        </span>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
