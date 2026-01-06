import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 px-6 transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
      
      {/* 1. Background Pattern - Subtle Geometric feel */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 30-15 30L15 30z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* 2. Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 mb-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800"
        >
          <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            🌙 Digital Library of Sunnah
          </span>
        </motion.div>

        {/* 3. Main Title with Gradient Shimmer */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white"
        >
          Search <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Authentic</span> Hadith Collections
        </motion.h1>

        {/* 4. Subtext with staggered fade-in */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Access the wisdom of <span className="font-semibold text-slate-800 dark:text-slate-200">Sahih Bukhari, Muslim, Tirmidhi</span>, and more with our advanced verification search engine.
        </motion.p>

        {/* 5. Decorative Underline/Divider */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-1 bg-emerald-500 mx-auto mt-8 rounded-full"
        />
      </div>

      {/* 6. Subtle Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[20%] w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-64 h-64 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}