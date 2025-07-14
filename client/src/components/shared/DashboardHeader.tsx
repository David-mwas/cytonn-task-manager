type Props = {
  user: { email?: string } | null;
  onLogout: () => void;
  title?: string;
};

export default function DashboardHeader({ user, onLogout, title }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">
        {title || "Dashboard"}
      </h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
