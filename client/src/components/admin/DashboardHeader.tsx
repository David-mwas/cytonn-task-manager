// src/components/admin/DashboardHeader.tsx


type Props = {
  user: { email?: string } | null;
  onLogout: () => void;
  onHamburgerClick: () => void;
};

export default function DashboardHeader({
  user,
  onLogout,
  onHamburgerClick,
}: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50 flex items-center justify-between px-6 py-4">
      <button
        className="md:hidden text-gray-700 mr-4"
        onClick={onHamburgerClick}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      <h1 className="text-xl font-bold text-gray-800 flex-1">
        Admin Dashboard
      </h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          Logged in as: <strong>{user?.email}</strong>
        </span>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
