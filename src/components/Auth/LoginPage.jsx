import { useState } from "react";
import api from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);  //   Update global user state
      navigate("/");  
    } catch (err) {
        console.error(err);
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-6">
      <div className="bg-white/80 backdrop-blur shadow-xl p-10 rounded-2xl w-full max-w-md border border-white/40">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">DSA Sheet</span>
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Login to track your DSA progress
        </p>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
              placeholder="youremail@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
              placeholder="***********"
            />
          </div>

          {error && (
            <div className="text-red-600 text-center text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?
          <span className="text-blue-600 font-medium cursor-pointer">
            {" "}
            Contact admin
          </span>
        </div> */}
      </div>
    </div>
  );
}
