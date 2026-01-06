import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineChevronLeft, HiSearch, HiOutlinePlay, 
  HiOutlinePause, HiTranslate,
  HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight,
  HiOutlineViewGrid, HiOutlineCollection
} from "react-icons/hi";

// Memoized Ayah component to prevent performance lag
const AyahRow = memo(({ ayah, translation, lang }) => (
  <div className="pb-20 border-b border-slate-100 dark:border-white/5 last:border-0">
    <p className="text-5xl font-arabic leading-[5.5rem] text-right dark:text-white mb-10" dir="rtl">
      {ayah.text}
    </p>
    <p className={`text-2xl text-right leading-relaxed ${lang === 'ur' ? 'font-urdu text-emerald-700/80' : 'text-slate-500'}`} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
      {translation}
    </p>
  </div>
));

export default function QuranPage() {
  const [viewMode, setViewMode] = useState(null); 
  const [items, setItems] = useState([]); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [lang, setLang] = useState("ur"); 
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // --- AUDIO ENGINE ---
  useEffect(() => {
    const syncAudio = async () => {
      if (audioRef.current && audioUrl) {
        try {
          audioRef.current.pause();
          audioRef.current.src = audioUrl; 
          audioRef.current.load();
          
          if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) await playPromise;
          }
        } catch (err) {
          console.warn("Audio sync handled safely");
        }
      }
    };
    syncAudio();
  }, [audioUrl, isPlaying]);

  const initLibrary = async (mode) => {
    setLoading(true);
    setViewMode(mode);
    try {
      if (mode === 'surah') {
        const res = await fetch("https://api.alquran.cloud/v1/surah");
        const data = await res.json();
        setItems(data.data);
      } else {
        const paras = Array.from({ length: 30 }, (_, i) => ({
          number: i + 1,
          englishName: `Para ${i + 1}`,
          name: `پارہ ${i + 1}`,
        }));
        setItems(paras);
      }
    } catch (err) { console.error("Library failed"); }
    setLoading(false);
  };

  const loadContent = async (number) => {
    setLoading(true);
    setSelectedItem(number);
    setIsPlaying(false);
    
    try {
      const type = viewMode === 'surah' ? 'surah' : 'juz';
      
      // PARALLEL FETCH: Fixes the "Missing Editions" error for Juz
      const [arRes, urRes, enRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/${type}/${number}/quran-uthmani`),
        fetch(`https://api.alquran.cloud/v1/${type}/${number}/ur.jalandhry`),
        fetch(`https://api.alquran.cloud/v1/${type}/${number}/en.sahih`)
      ]);

      const [arData, urData, enData] = await Promise.all([
        arRes.json(), urRes.json(), enRes.json()
      ]);

      if (!arData.data) throw new Error("Arabic data missing");

      // Combine results into an array format our reader expects
      const combinedEditions = [arData.data, urData.data, enData.data];
      setSurahData(combinedEditions);

      // Audio Logic: Find surah number from the first ayah of the selection
      const firstAyah = arData.data.ayahs[0];
      const surahNumForAudio = viewMode === 'surah' ? number : firstAyah.surah.number;

      setAudioUrl(`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumForAudio}.mp3`);
      
      setTimeout(() => setIsPlaying(true), 300);
    } catch (err) { 
      console.error("Reader Error:", err);
      alert("Error loading content. Please try again.");
      setSelectedItem(null);
    }
    setLoading(false);
  };

  const toggleAudio = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  if (loading && !selectedItem) return <LoadingState text="Preparing Quranic Library..." />;

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#030712] transition-colors duration-700">
      <AnimatePresence mode="wait">
        {!viewMode ? (
          <motion.div key="portal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-screen flex flex-col items-center justify-center p-6 text-center">
            <header className="mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600 block mb-4">The Final Revelation</span>
              <h2 className="text-6xl font-extralight dark:text-white tracking-tighter">Quran <span className="font-black italic text-emerald-600">Majeed</span></h2>
            </header>
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl">
              <SelectionCard icon={<HiOutlineViewGrid size={40}/>} title="By Surah" desc="Chapter Navigation" onClick={() => initLibrary('surah')} />
              <SelectionCard icon={<HiOutlineCollection size={40}/>} title="By Para" desc="Juz Navigation" onClick={() => initLibrary('para')} />
            </div>
          </motion.div>
        ) : !selectedItem ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 py-12">
             <button onClick={() => setViewMode(null)} className="mb-10 flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-black text-[10px] uppercase tracking-widest transition-all">
               <HiOutlineChevronLeft size={18}/> Home Portal
             </button>
             <div className="relative max-w-md mb-12">
                <HiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder={`Search ${viewMode}...`} className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 py-5 pl-14 pr-6 rounded-[2rem] outline-none shadow-sm focus:ring-4 ring-emerald-500/5 text-sm" onChange={(e) => setSearch(e.target.value)} />
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.filter(s => s.englishName.toLowerCase().includes(search.toLowerCase())).map((item) => (
                <motion.div key={item.number} whileHover={{ y: -8 }} onClick={() => loadContent(item.number)} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all cursor-pointer group">
                  <div className="flex justify-between items-center mb-6">
                    <span className="w-10 h-10 flex items-center justify-center bg-emerald-500/10 text-emerald-600 rounded-xl font-black text-xs group-hover:bg-emerald-500 group-hover:text-white transition-colors">{item.number}</span>
                    <span className="text-xl font-arabic dark:text-white">{item.name}</span>
                  </div>
                  <h3 className="text-lg font-black dark:text-white group-hover:text-emerald-600 transition-colors">{item.englishName}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="reader" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-6 py-24 pb-64">
            <div className="fixed top-12 left-12 flex gap-4 z-50">
              <button onClick={() => { setSelectedItem(null); setSurahData(null); setIsPlaying(false); }} className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-full shadow-2xl border border-slate-100 dark:border-white/10 hover:scale-110 transition-transform">
                <HiOutlineChevronLeft size={24} className="text-emerald-600" />
              </button>
              <button onClick={() => setLang(lang === "ur" ? "en" : "ur")} className="px-8 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-full shadow-2xl border border-slate-100 dark:border-white/10 font-black text-[10px] tracking-widest uppercase text-emerald-600 flex items-center gap-2">
                <HiTranslate /> {lang === "ur" ? "Urdu" : "English"}
              </button>
            </div>

            {surahData && (
              <div className="space-y-32">
                <div className="text-center py-20">
                  <h2 className="text-8xl font-arabic text-emerald-600 mb-8">
                    {viewMode === 'surah' ? surahData[0].name : `Para ${selectedItem}`}
                  </h2>
                  <div className="h-px w-24 bg-emerald-500/20 mx-auto" />
                </div>
                {surahData[0].ayahs.map((ayah, index) => (
                  <AyahRow 
                    key={index} 
                    ayah={ayah} 
                    lang={lang} 
                    translation={surahData[lang === 'ur' ? 1 : 2]?.ayahs[index]?.text || "Translation not available"} 
                  />
                ))}
              </div>
            )}
            
            {/* COMPACT AUDIO DOCK */}
            <motion.div 
              initial={{ y: 100 }} 
              animate={{ y: 0 }} 
              className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[480px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 px-6 py-3 rounded-[2.5rem] shadow-2xl z-50"
            >
              <div className="px-2 mb-2">
                <input 
                  type="range" min="0" max={duration || 0} value={currentTime} 
                  onChange={(e) => { audioRef.current.currentTime = e.target.value; }} 
                  className="w-full h-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full appearance-none cursor-pointer accent-emerald-500" 
                />
                <div className="flex justify-between mt-1 text-[9px] font-bold text-emerald-600/60 uppercase tracking-tighter">
                  <span>{Math.floor(currentTime/60)}:{Math.floor(currentTime%60).toString().padStart(2,'0')}</span>
                  <span>{Math.floor(duration/60)}:{Math.floor(duration%60).toString().padStart(2,'0')}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8">
                <button onClick={() => audioRef.current.currentTime -= 10} className="text-slate-400 hover:text-emerald-500 transition-colors">
                  <HiOutlineChevronDoubleLeft size={20} />
                </button>
                <button onClick={toggleAudio} className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
                  {isPlaying ? <HiOutlinePause size={24} /> : <HiOutlinePlay size={24} className="ml-1" />}
                </button>
                <button onClick={() => audioRef.current.currentTime += 10} className="text-slate-400 hover:text-emerald-500 transition-colors">
                  <HiOutlineChevronDoubleRight size={20} />
                </button>
              </div>

              <audio 
                ref={audioRef} 
                onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)} 
                onLoadedMetadata={() => setDuration(audioRef.current.duration)} 
                onEnded={() => setIsPlaying(false)} 
                onError={() => setIsPlaying(false)} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components
function SelectionCard({ icon, title, desc, onClick }) {
  return (
    <motion.button whileHover={{ y: -10, scale: 1.02 }} onClick={onClick} className="flex-1 p-14 rounded-[4rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-xl hover:shadow-emerald-500/20 transition-all group">
      <div className="w-24 h-24 bg-emerald-500/10 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">{icon}</div>
      <h3 className="text-4xl font-black dark:text-white mb-3 tracking-tighter">{title}</h3>
      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.3em]">{desc}</p>
    </motion.button>
  );
}

function LoadingState({ text }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#FDFDFD] dark:bg-[#030712]">
      <div className="w-14 h-14 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-8" />
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 animate-pulse">{text}</p>
    </div>
  );
}