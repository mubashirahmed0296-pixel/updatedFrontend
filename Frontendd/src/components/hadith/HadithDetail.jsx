import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import Modal from "../ui/Modal";

export default function HadithDetail() {
  const { bookSlug, hadithId } = useParams(); 
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchHadithDetail = async () => {
      setLoading(true);
      try {
        const apiKey = "$2y$10$3XWI8hS5ZeHDPZmnUIQGuegOgBWD1msk5PHgg3ljR2ScBx2DjMry";
        const url = `https://hadithapi.com/public/api/hadiths?apiKey=${apiKey}&book=${bookSlug}&hadithNumber=${hadithId}`;
        
        const res = await fetch(url);
        const data = await res.json();

        if (data.status === 200 && data.hadiths.data.length > 0) {
          const h = data.hadiths.data[0];
          setHadith({
            arabic: h.hadithArabic,
            english: h.hadithEnglish,
            urdu: h.hadithUrdu,
            reference: {
              book: h.book.bookName,
              chapter: h.chapter?.chapterEnglish || "General",
              number: h.hadithNumber,
              narrator: h.englishNarrator,
              grade: h.status || "Authentic"
            }
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (bookSlug && hadithId) fetchHadithDetail();
  }, [bookSlug, hadithId]);

  if (loading) return (
    <div className="py-20 flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );

  if (!hadith) return <div className="text-center py-20 dark:text-white">Hadith not found.</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-6">
        <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-xl flex items-center gap-1">
          <button
            onClick={() => setLanguage("en")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              language === "en" 
              ? "bg-emerald-500 text-white shadow-lg" 
              : "text-slate-500 dark:text-slate-400"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("ur")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              language === "ur" 
              ? "bg-emerald-500 text-white shadow-lg" 
              : "text-slate-500 dark:text-slate-400"
            }`}
          >
            اردو
          </button>
        </div>
      </div>

      <section className="space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative p-8 md:p-12 rounded-[2rem] bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 shadow-xl"
        >
          <p className="text-3xl md:text-5xl leading-[2.2] text-right font-serif text-slate-800 dark:text-slate-100" dir="rtl">
            {hadith.arabic}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {language === "ur" ? (
            <motion.div
              key="urdu"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 border-r-4 border-emerald-500 mr-4 text-right"
            >
              <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-4">اردو ترجمہ</h4>
              <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 leading-relaxed font-serif" dir="rtl">
                {hadith.urdu || "ترجمہ دستیاب نہیں ہے۔"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="english"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-4"
            >
              <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-4">English Translation</h4>
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed italic font-light">
                "{hadith.english}"
              </p>
              <p className="mt-4 text-emerald-600 font-medium italic">— {hadith.reference.narrator}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-200 dark:border-slate-800">
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Related Knowledge
          </h3>
          <ul className="grid gap-3">
            <motion.li 
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              <span className="text-emerald-500">🔗</span>
              <span className="text-slate-600 dark:text-slate-400">More from {hadith.reference.book}</span>
            </motion.li>
          </ul>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl h-fit">
          <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">Reference Details</h4>
          <div className="space-y-5 text-sm">
            <div>
              <p className="text-slate-500 uppercase text-[10px] font-bold">Source Book</p>
              <p className="font-semibold text-base">{hadith.reference.book}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase text-[10px] font-bold">Status</p>
              <span className="inline-block mt-1 px-3 py-1 rounded-lg bg-emerald-500 text-xs font-black uppercase">
                {hadith.reference.grade}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full mt-10 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-sm font-bold transition-all shadow-lg"
          >
            VIEW COMMENTARY
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="p-8 max-w-lg">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Explanation</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                This narration from {hadith.reference.book} is graded as {hadith.reference.grade}.
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="mt-8 w-full py-3 bg-emerald-600 text-white rounded-xl font-bold"
              >
                Close
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}