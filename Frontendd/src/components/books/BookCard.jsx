import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * BookCard
 * Displays a single Hadith book with basic metadata.
 * This is a presentational component (no API logic here).
 */
export default function BookCard({ book }) {

  // Defensive check to avoid runtime crashes
  if (!book) return null;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden bg-white dark:bg-slate-900
                 border border-slate-200 dark:border-slate-800
                 rounded-2xl p-6 shadow-sm
                 hover:shadow-xl hover:shadow-emerald-500/10
                 transition-all duration-300"
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16
                      bg-emerald-500/5 rounded-bl-full
                      -mr-8 -mt-8 group-hover:bg-emerald-500/20" />

      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-2">
          {book.title}
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold px-2 py-1 rounded-md">
            {book.hadithCount} Hadiths
          </span>
          <span className="text-xs italic text-slate-400">
            Authentic Collection
          </span>
        </div>

        <Link
          to={`/books/${book.slug}`}
          className="inline-flex items-center text-sm font-semibold text-emerald-600"
        >
          View Chapters →
        </Link>
      </div>
    </motion.div>
  );
}
