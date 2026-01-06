import { motion } from "framer-motion";
import ChapterCard from "./ChapterCard";

/**
 * ChapterList
 * Handles rendering of chapters with proper UI states.
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function ChapterList({ chapters, bookSlug, loading, error }) {

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-medium">
        {error}
      </div>
    );
  }

  if (!chapters || chapters.length === 0) {
    return (
      <div className="text-center py-20">
        No chapters found for this collection.
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {chapters.map(chapter => (
        <ChapterCard
          key={chapter.id}
          chapter={chapter}
          bookSlug={bookSlug}
        />
      ))}
    </motion.div>
  );
}
