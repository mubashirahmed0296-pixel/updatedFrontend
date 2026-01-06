import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Hero from "../components/home/Hero";
import SearchBar from "../components/ui/SearchBar";
import SectionTitle from "../components/ui/SectionTitle";
import { HiOutlineBookOpen, HiOutlineCollection, HiOutlineSparkles, HiOutlineShieldCheck } from "react-icons/hi";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect logic: If logged in, don't show landing page
  useEffect(() => {
    if (user) {
      navigate("/books", { replace: true });
    }
  }, [user, navigate]);

 
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500">
      {/* --- HERO SECTION --- */}
      <div className="relative ">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px]">
          <div className="absolute top-0 -left-10 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-20 -right-10 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full animate-bounce-slow" />
        </div>
        
        <Hero />
      </div>

      
  

     
     
      {/* --- PREMIUM CTA BOX --- */}
      <div className="max-w-7xl mx-auto px-6 pt-30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative py-20 px-8 rounded-[3rem] bg-slate-900 dark:bg-slate-400 overflow-hidden text-center shadow-2xl shadow-emerald-500/20"
        >
          {/* Abstract background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-400 dark:text-emerald-900 dark:bg-slate-900/20 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
              Start your journey
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white dark:text-slate-900 mb-8 uppercase tracking-tighter leading-none">
              The entire Sunnah <br /> 
              <span className="opacity-50 italic font-light">at your fingertips</span>
            </h2>
            
            <div className="flex flex-col sm:row items-center justify-center gap-6">
              <Link
                to="/login"
                className="group relative px-12 py-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black uppercase tracking-widest rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Get Started Now</span>
                <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/signup"
                className="text-white/60 dark:text-slate-900/60 font-black uppercase tracking-widest text-xs hover:text-white dark:hover:text-slate-900 transition-colors"
              >
                Create a Free Account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}