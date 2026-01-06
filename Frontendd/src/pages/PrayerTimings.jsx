import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiLocationMarker, HiMoon, HiSun, HiClock, HiOutlineChevronRight } from "react-icons/hi";
import { getPrayerStatus } from "../utils/prayerLogic";

export default function PrayerPage() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState({ current: "", nextName: "", nextTime: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const result = await res.json();
        setData(result.data);
        setStatus(getPrayerStatus(result.data.timings));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prayers:", error);
      }
    });
  }, []);

  if (loading) return <LoadingState />;

  const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const prayerIcons = {
    Fajr: <HiMoon size={20} />, Dhuhr: <HiSun size={20} />, Asr: <HiSun size={20} />, Maghrib: <HiMoon size={20} />, Isha: <HiMoon size={20} />
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] dark:bg-[#030712] transition-colors duration-700 overflow-hidden relative">
      
      {/* Glossy Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        
        {/* Header: Minimal & Clean */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold tracking-[0.3em] uppercase text-[10px] mb-4">
              <HiLocationMarker /> {data.meta.timezone.split('/')[1].replace('_', ' ')}
            </div>
            <h1 className="text-6xl font-extralight text-slate-900 dark:text-white tracking-tighter leading-none">
              Daily <span className="font-black italic text-emerald-600">Prayers</span>
            </h1>
          </motion.div>

          <div className="flex flex-col items-end">
             <div className="text-right border-r-2 border-emerald-500 pr-4">
                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{data.date.readable}</p>
                <p className="text-xs text-slate-400 font-medium italic">
                  {data.date.hijri.day} {data.date.hijri.month.en} {data.date.hijri.year}
                </p>
             </div>
          </div>
        </div>

        {/* The Glass Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Active Prayer: Pure Gloss */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 p-10 rounded-[3rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-between min-h-[450px]"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10">
               <HiClock size={120} className="text-emerald-600 dark:text-white" />
            </div>
            
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600 mb-2 block">Ongoing</span>
              <h2 className="text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                {status.current}
              </h2>
            </div>

            <div className="space-y-6">
              <div className="text-6xl font-extralight text-slate-900 dark:text-white opacity-80">{data.timings[status.current]}</div>
              <div className="inline-flex items-center gap-4 bg-emerald-600 px-6 py-4 rounded-2xl shadow-xl shadow-emerald-600/20 text-white">
                <span className="text-[10px] font-black uppercase tracking-widest">Next: {status.nextName} • {status.nextTime}</span>
                <HiOutlineChevronRight />
              </div>
            </div>
          </motion.div>

          {/* Individual Times: The Minimal Tiles */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {prayerNames.map((name, i) => {
              const isActive = status.current === name;
              return (
                <motion.div 
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-8 rounded-[2.5rem] border transition-all duration-500 relative flex flex-col justify-between overflow-hidden ${
                    isActive 
                    ? "bg-white dark:bg-slate-900 border-emerald-500/50 shadow-2xl scale-[1.02] z-10" 
                    : "bg-white/40 dark:bg-slate-900/20 border-white dark:border-white/5 backdrop-blur-md"
                  }`}
                >
                  <div className="flex justify-between items-center mb-10">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isActive ? "text-emerald-600" : "text-slate-400"}`}>
                      {name}
                    </span>
                    <div className={isActive ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"}>
                      {prayerIcons[name]}
                    </div>
                  </div>
                  <div className={`text-3xl font-bold tracking-tight ${isActive ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}`}>
                    {data.timings[name]}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfdfd] dark:bg-[#030712]">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30 backdrop-blur-xl"
      >
        <div className="w-8 h-8 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
      </motion.div>
      <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Aligning with the Light</p>
    </div>
  );
}