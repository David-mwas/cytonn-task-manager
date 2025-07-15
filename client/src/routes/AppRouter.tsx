import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useAuth } from "../hooks/useAuth";
import PrivateRoute from "./privateRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import { Toaster } from "react-hot-toast";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={user ? `/${user.role}` : "/login"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin/*"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/user/*"
            element={
              <PrivateRoute role="user">
                <UserDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
