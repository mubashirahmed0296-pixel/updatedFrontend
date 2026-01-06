import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  
  const handleClear = () => {
    // Create a mock event to trigger the existing onChange handler
    onChange({ target: { value: "" } });
  };

  return (
    <div className="relative group w-full max-w-xl mx-auto">
      {/* Outer Glow Effect on Hover/Focus */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full opacity-0 group-focus-within:opacity-20 group-hover:opacity-10 transition duration-300"></div>
      
      <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-5 py-3 transition-all duration-300 group-focus-within:border-emerald-500 group-focus-within:ring-4 group-focus-within:ring-emerald-500/10 shadow-sm">
        
        {/* Search Icon */}
        <FaSearch className={`transition-colors duration-300 ${
          value ? "text-emerald-500" : "text-slate-400 dark:text-slate-500"
        }`} />
        
        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="ml-4 bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm md:text-base font-medium"
        />

        {/* Clear Button (Only shows when there is text) */}
        {value && (
          <button
            onClick={handleClear}
            className="ml-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-emerald-500 transition-all"
          >
            <FaTimes size={14} />
          </button>
        )}
      </div>

      {/* Subtle Keyboard Hint (Hidden on mobile) */}
      {!value && (
        <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 pointer-events-none">
          <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
            ⌘
          </kbd>
          <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
            K
          </kbd>
        </div>
      )}
    </div>
  );
}