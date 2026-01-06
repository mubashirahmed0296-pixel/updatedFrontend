import { motion } from "framer-motion";

export default function SectionTitle({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-12 text-center"
    >
      {/* Main Title */}
      <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i === 1 ? "text-emerald-600" : ""}>
            {word}{" "}
          </span>
        ))}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Premium Divider - Emerald Diamond Style */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-500/50"></div>
        <div className="rotate-45 w-2 h-2 bg-emerald-600 rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-500/50"></div>
      </div>
    </motion.div>
  );
}