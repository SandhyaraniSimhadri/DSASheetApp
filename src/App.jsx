import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import api from "./api/axiosClient";
import LoginPage from "./components/Auth/LoginPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import MainLayout from "./components/Layout/MainLayout";

import Profile from "./pages/Profile";
import Topics from "./pages/Topics";
import Progress from "./pages/Progress";
import Loader from "./components/Layout/Loader";

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(false);

  const navigate = useNavigate();

  // Check login using HttpOnly cookie
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user);
        navigate("/");
      })
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  // Show loading screen
  if (checking) return <Loader />;

  return (
    <Routes>
      {/*LOGIN PAGE  */}
      <Route path="/login" element={<LoginPage onLogin={setUser} />} />

      {/* PROTECTED AREA  */}
      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user} onLogout={() => setUser(null)} />
          </ProtectedRoute>
        }
      >
        {/* Default page after login */}
        <Route index element={<Profile user={user} />} />

        {/* Other pages */}
        <Route path="progress" element={<Progress />} />
        <Route path="topics" element={<Topics user={user} />} />
      </Route>

      {/*FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
