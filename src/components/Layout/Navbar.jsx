import { NavLink } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const linkClasses = "px-2 py-1 rounded hover:bg-blue-500 transition";

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">DSA Sheet</h1>

        <nav className="flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive ? "bg-white text-blue-600 font-semibold" : ""
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/topics"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive ? "bg-white text-blue-600 font-semibold" : ""
              }`
            }
          >
            Topics
          </NavLink>

          <NavLink
            to="/progress"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive ? "bg-white text-blue-600 font-semibold" : ""
              }`
            }
          >
            Progress
          </NavLink>

          <button
            onClick={onLogout}
            className="bg-red-400 text-white-600 px-4 py-1 rounded hover:bg-blue-100"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
