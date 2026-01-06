import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../utils/api";


export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);




    try {
      const response = await API.post("/auth/register", formData);




      // FIX: Added { replace: true } to remove signup from the history stack
      navigate("/login", { replace: true });

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";



    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden transition-colors duration-500">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-emerald-50/50 dark:from-emerald-900/10 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg z-10"
      >
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            Create <span className="text-emerald-600 dark:text-emerald-500 font-light italic">Account</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600/60 dark:text-emerald-500/40">
            Begin Your Journey
          </p>
        </header>

        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                required
                disabled={loading}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-700"
                placeholder="Abdullah"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                required
                disabled={loading}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-700"
                placeholder="Khan"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
              Email Identity
            </label>
            <input
              type="email"
              name="email"
              required
              disabled={loading}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-700"
              placeholder="name@domain.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
              Secret Key
            </label>
            <input
              type="password"
              name="password"
              required
              disabled={loading}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-3 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-700"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-5 ${loading ? 'bg-slate-400' : 'bg-emerald-600 dark:bg-emerald-500'} text-white font-bold rounded-full hover:bg-emerald-700 dark:hover:bg-emerald-400 shadow-xl shadow-emerald-500/10 transition-all flex items-center justify-center gap-3 text-sm tracking-widest uppercase mt-4`}
          >
            {loading ? "Processing..." : "Create Account"}
            {!loading && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </motion.button>
        </form>

        <footer className="mt-16 text-center">
          <p className="text-sm text-slate-400">
            Already registered?{" "}
            <Link to="/login" className="text-slate-900 dark:text-white font-bold hover:text-emerald-600 underline underline-offset-4 transition-colors">
              Sign in instead
            </Link>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}