import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * ChapterCard
 * Displays a single chapter of a selected book.
 */
export default function ChapterCard({ chapter, bookSlug }) {

  if (!chapter) return null;

  return (
    <Link
      to={`/books/${bookSlug}/chapters/${chapter.chapterNumber}`}
      className="block h-full"
    >
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="group h-full bg-white dark:bg-slate-900
                   border border-slate-200 dark:border-slate-800
                   p-6 rounded-2xl shadow-sm transition-all"
      >
        <div className="flex justify-between mb-4">
          <span className="min-w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 font-bold">
            {chapter.chapterNumber}
          </span>
          <span className="text-xs uppercase tracking-widest text-slate-400">
            Chapter
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2">
          {chapter.title}
        </h3>

        {chapter.arabic && (
          <p className="text-right text-2xl font-arabic" dir="rtl">
            {chapter.arabic}
          </p>
        )}
      </motion.div>
    </Link>
  );
}
