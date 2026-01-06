import { motion } from "framer-motion";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Logic to show only a subset of pages if totalPages is large
  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5; // Number of page buttons to show at once

    if (totalPages <= showMax) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-all"
      >
        <span className="sr-only">Previous</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <div key={index} className="relative">
            {page === "..." ? (
              <span className="px-3 py-2 text-slate-400">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`relative z-10 px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 ${
                  page === currentPage
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {page}
                {page === currentPage && (
                  <motion.div
                    layoutId="activePage"
                    className="absolute inset-0 bg-emerald-600 rounded-xl -z-10 shadow-lg shadow-emerald-600/30"
                    transition={{ type: "spring", stiffness: 300, damping: 300 }}
                  />
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-all"
      >
        <span className="sr-only">Next</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}