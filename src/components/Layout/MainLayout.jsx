import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-6xl mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}
