import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function TopicCard({ topic }) {
  return (
    <Link to={`/topics/${topic.slug}`}>
      <motion.div
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="group h-full bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              {topic.category}
            </span>
          </div>

          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-500 transition-colors">
            {topic.title}
          </h3>
          
          <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
            {topic.intro}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-emerald-500 transition-all">
          Read Article <span>→</span>
        </div>
      </motion.div>
    </Link>
  );
}