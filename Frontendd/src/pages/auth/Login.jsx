import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import API from "../../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth(); // Added user from useAuth
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from ProtectedRoute, or default to Books
  const from = location.state?.from?.pathname || "/books";

  // FIX: Redirect if user is already logged in (prevents back-button to login)
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      // Pass token and user object to context
      login(response.data.token, response.data.user);
      
      // FIX: Use { replace: true } to remove login from history stack
      navigate(from, { replace: true });
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Authentication failed";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center px-6 relative overflow-hidden transition-colors duration-500">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-emerald-50/50 dark:from-emerald-900/10 to-transparent pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-sm z-10"
      >
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            Welcome <span className="text-emerald-600 dark:text-emerald-500 font-light italic">Back</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600/60 dark:text-emerald-500/40">
            Authorized Access Only
          </p>
          {location.state?.from && (
            <p className="mt-2 text-[10px] text-emerald-600 font-bold uppercase">
              Please login to access {location.state.from.pathname.replace('/', '')}
            </p>
          )}
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
              Email Address
            </label>
            <input 
              type="email" 
              required
              className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-700" 
              placeholder="name@domain.com"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                Password
              </label>
              <button type="button" className="text-[10px] text-emerald-600 hover:text-emerald-500 font-bold uppercase tracking-tighter">Lost Key?</button>
            </div>
            <input 
              type="password" 
              required
              className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-colors" 
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <motion.button 
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full py-4 ${loading ? 'bg-slate-400' : 'bg-emerald-600 dark:bg-emerald-500'} text-white font-bold rounded-full hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 text-sm tracking-wide mt-4`}
          >
            {loading ? "Verifying..." : "Authenticate"}
            {!loading && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            )}
          </motion.button>
        </form>

        <footer className="mt-16 text-center">
          <p className="text-sm text-slate-400">
            No account yet?{" "}
            <Link to="/signup" className="text-slate-900 dark:text-white font-bold hover:text-emerald-600 underline underline-offset-4 transition-colors">
              Create one here
            </Link>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}