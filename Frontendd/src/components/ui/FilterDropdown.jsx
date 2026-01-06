import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaCheck } from "react-icons/fa";

export default function FilterDropdown({ label, options, onSelect }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All"); // Default state
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Label above dropdown (Optional but premium) */}
      <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4 mb-1">
        {label}
      </span>

      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center justify-between w-48 rounded-2xl border px-5 py-3 text-sm font-semibold transition-all duration-300 ${
          open 
            ? "border-emerald-500 ring-4 ring-emerald-500/10 bg-white dark:bg-slate-900 shadow-lg" 
            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-emerald-500/50"
        }`}
      >
        <span className="truncate">{selected}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown className={`ml-2 text-xs ${open ? "text-emerald-500" : "text-slate-400"}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute mt-2 w-52 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl shadow-emerald-900/10 z-[60] overflow-hidden p-1"
          >
            {options.map((opt, idx) => (
              <button
                key={idx}
                className={`flex items-center justify-between w-full px-4 py-3 text-sm rounded-xl transition-colors ${
                  selected === opt
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
                {selected === opt && <FaCheck size={10} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}