import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Pagination from "../components/ui/Pagination"; // Ensure this path is correct

export default function ChapterPage() {
  const { bookSlug, chapterNumber } = useParams();
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Pagination Logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHadiths = async () => {
      setLoading(true);
      try {
        const apiKey = "$2y$10$3XWI8hS5ZeHDPZmnUIQGuegOgBWD1msk5PHgg3ljR2ScBx2DjMry";
        // Added paginate and page parameters to the URL
        const url = `https://hadithapi.com/public/api/hadiths?apiKey=${apiKey}&book=${bookSlug}&chapter=${chapterNumber}&paginate=10&page=${currentPage}`;
        
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.status === 200) {
          setHadiths(data.hadiths.data || []);
          setTotalPages(data.hadiths.last_page); // Get total pages from API
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        // Scroll to top when page changes for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    fetchHadiths();
  }, [bookSlug, chapterNumber, currentPage]); // Re-run when page changes

  if (loading && hadiths.length === 0) return (
    <div className="min-h-screen flex items-center justify-center dark:bg-slate-950">
      <div className="animate-pulse text-emerald-500 font-medium">Loading Chapter...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumb & Navigation */}
        <nav className="mb-8 flex items-center gap-2 text-sm font-medium">
          <Link to="/books" className="text-slate-400 hover:text-emerald-500">Books</Link>
          <span className="text-slate-300">/</span>
          <Link to={`/books/${bookSlug}`} className="text-slate-400 hover:text-emerald-500 capitalize">
            {bookSlug.replace(/-/g, ' ')}
          </Link>
        </nav>

        {/* Page Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white capitalize mb-4">
             Chapter {chapterNumber}
          </h1>
          <div className="h-1.5 w-20 bg-emerald-500 rounded-full"></div>
        </header>

        {/* Hadith List */}
        <div className="flex flex-col gap-6">
          {hadiths.length > 0 ? (
            hadiths.map((h) => (
              <Link 
                key={h.id} 
                to={`/books/${bookSlug}/chapters/${chapterNumber}/hadith/${h.hadithNumber}`}
                className="group relative bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
              >
                {/* Hadith Metadata */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                      {h.hadithNumber}
                    </span>
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border ${
                      h.status === 'Sahih' 
                      ? 'border-green-200 text-green-600 bg-green-50 dark:bg-green-900/20 dark:border-green-900/50' 
                      : 'border-amber-200 text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-900/50'
                    }`}>
                      {h.status}
                    </span>
                  </div>
                </div>

                {/* Arabic Snippet */}
                <p 
                  className="text-right text-2xl mb-6 leading-[2.2] font-serif text-slate-800 dark:text-slate-100 line-clamp-2 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400" 
                  dir="rtl"
                >
                  {h.hadithArabic}
                </p>

                {/* English Snippet */}
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6">
                  {h.hadithEnglish}
                </p>

                {/* Action Footer */}
                <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-400 italic">Narrated by: {h.englishNarrator?.split(' ').slice(0, 3).join(' ')}...</span>
                  <span className="text-sm font-bold text-emerald-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Full Hadith 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-500">No hadiths found in this chapter.</p>
            </div>
          )}
        </div>

        {/* --- PAGINATION COMPONENT --- */}
        {totalPages > 1 && (
          <div className="py-10">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={(page) => setCurrentPage(page)} 
            />
          </div>
        )}
      </div>
    </div>
  );
}