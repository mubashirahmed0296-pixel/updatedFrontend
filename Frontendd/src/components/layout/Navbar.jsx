import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location]);

  const handleLogout = () => {
    logout(); 
     navigate("/"); // Forces a clean state reset
  };

  // --- NAVIGATION LOGIC ---
  
  // 1. Visible ONLY when LOGGED OUT
  const loggedOutOnly = [
    { path: "/", label: "Home" },
  ];

  // 2. Visible ONLY when LOGGED IN
  const loggedInOnly = [
    { path: "/books", label: "Books" },
    { path: "/topics", label: "Topics" },
    { path: "/quran", label: "Quran" },
  ];

  // 3. ALWAYS visible (Publicly accessible)
  const alwaysVisible = [
    { path: "/prayer", label: "Prayer" },
  ];

  // 4. Final list based on Auth State
  const navItems = user 
    ? [...loggedInOnly, ...alwaysVisible] 
    : [...loggedOutOnly, ...alwaysVisible];

  return (
    <nav
      className={`sticky top-0 z-[100] w-full transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group relative z-[110]">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-xl rotate-6 group-hover:rotate-12 transition-transform" />
            <div className="relative w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
              S
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tighter text-slate-900 dark:text-white uppercase">
            Sunnah<span className="text-emerald-600">Search</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center bg-slate-100/50 dark:bg-slate-900/40 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative px-5 py-2 text-sm font-bold transition-all rounded-xl ${
                  isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white dark:bg-slate-800 shadow-sm rounded-xl z-0"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 relative z-[110]">
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>

          {user ? (
            <div className="hidden md:flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{user.firstName}</p>
              </div>
              
              <div className="relative w-10 h-10">
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=10b981&color=fff&bold=true`} 
                  alt="Profile" 
                  className="w-full h-full rounded-xl object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                />
              </div>

              <button 
                onClick={handleLogout}
                className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="hidden md:block px-6 py-2.5 bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl transition-all hover:scale-105"
            >
              Login
            </Link>
          )}

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white transition-transform active:scale-90"
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE CONTENT --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
          >
            <div className="flex flex-col gap-2 p-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className="block px-4 py-4 text-2xl font-black text-slate-900 dark:text-white active:bg-slate-50 dark:active:bg-slate-900 rounded-2xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2"
              >
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 px-4 py-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=10b981&color=fff&bold=true`} 
                        className="w-12 h-12 rounded-xl"
                        alt="Avatar"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{user.firstName} {user.lastName}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-5 bg-red-500 text-white font-black text-center uppercase tracking-widest rounded-2xl shadow-lg shadow-red-500/20"
                    >
                      Logout from Account
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block w-full px-4 py-5 bg-emerald-600 text-white font-black text-center uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-600/20"
                  >
                    Login to Account
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}