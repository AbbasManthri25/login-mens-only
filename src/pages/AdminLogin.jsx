import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { isAuthenticated, login } from "../utils/adminStore";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated()) {
    return <Navigate to={location.state?.from?.pathname || "/admin"} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username.trim(), password)) {
      navigate(location.state?.from?.pathname || "/admin", { replace: true });
    } else {
      setError("Incorrect username or password.");
    }
  };

  return (
    <div className="bg-cream min-h-screen flex items-center justify-center px-6 pt-28 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-xs tracking-[0.3em] text-gold-dark uppercase">Admin Access</span>
          <h1 className="font-display text-4xl text-ink mt-3">STORE LOGIN</h1>
          <p className="text-ink/60 text-sm mt-2">Sign in to manage product photos.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-charcoal border border-gold-dark/20 rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="block text-xs uppercase tracking-wide text-ink/60 mb-2">
              Username
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-ink/15 bg-cream/40 px-4 py-3 focus-within:border-gold-dark/50">
              <User size={16} className="text-gold-dark" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="bg-transparent outline-none text-ink text-sm w-full"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-ink/60 mb-2">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-ink/15 bg-cream/40 px-4 py-3 focus-within:border-gold-dark/50">
              <Lock size={16} className="text-gold-dark" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="bg-transparent outline-none text-ink text-sm w-full"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-ink hover:bg-gold-light transition-all"
          >
            Log In
          </button>

          <Link
            to="/"
            className="block text-center text-xs text-ink/50 hover:text-gold-dark transition-colors"
          >
            Back to site
          </Link>
        </form>
      </div>
    </div>
  );
}
