import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden px-6 transition-colors duration-500">
      
      {/* Background Decorative Auras */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-emerald-100/40 dark:bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-teal-100/30 dark:bg-teal-500/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center"
      >
        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-600 dark:text-emerald-500 mb-6 block">
          Entry Not Found
        </span>
        
        {/* PRO MAX VISIBILITY FIX: 
            In light mode, we use 'text-slate-200/50' with a 'drop-shadow'.
            This makes the 404 look like a watermark—visible but elegant.
        */}
        <h1 className="text-[10rem] md:text-[16rem] font-black leading-none select-none
          text-slate-200/60 dark:text-slate-900/80
          drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)] dark:drop-shadow-none
        ">
          404
        </h1>

        <div className="mt-[-2.5rem] md:mt-[-4.5rem]">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Path not <span className="text-emerald-600">found.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-12 text-base md:text-lg font-medium leading-relaxed">
            The narration you are looking for has been moved or does not exist. 
            Return to the library to continue your study.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Primary Button: Dark Slate for maximum "Pro" contrast in Light Mode */}
            <Link
              to="/"
              className="group relative px-10 py-4 bg-slate-900 dark:bg-emerald-600 text-white font-bold rounded-2xl shadow-2xl shadow-slate-900/20 dark:shadow-emerald-600/20 transition-all hover:-translate-y-1 active:scale-95"
            >
              Return Home
            </Link>
            
            {/* Secondary Button: Clean Glass Style */}
            <Link
              to="/books"
              className="px-10 py-4 bg-white/80 dark:bg-slate-900 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-10 flex items-center gap-4 opacity-50">
        <div className="h-[1px] w-12 bg-slate-300 dark:bg-slate-800" />
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
          SunnahSearch Digital
        </span>
        <div className="h-[1px] w-12 bg-slate-300 dark:bg-slate-800" />
      </div>
    </div>
  );
}