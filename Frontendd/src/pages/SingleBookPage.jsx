import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ChapterList from "../components/chapters/ChapterList";
import Pagination from "../components/ui/Pagination"; // Import your component

export default function SingleBookPage() {
  const { bookSlug } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchChapters = async () => {
      if (!bookSlug) return;
      
      setLoading(true);
      setError(null);

      try {
        const apiKey = "$2y$10$3XWI8hS5ZeHDPZmnUIQGuegOgBWD1msk5PHgg3ljR2ScBx2DjMry";
        
        // Added &paginate=12 and &page=${currentPage}
        const url = `https://hadithapi.com/public/api/${bookSlug}/chapters?apiKey=${apiKey}&paginate=12&page=${currentPage}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 200) {
          // data.chapters.data contains the array when paginated
          const rawChapters = data.chapters.data || data.chapters || [];
          
          // data.chapters.last_page contains the total pages
          setTotalPages(data.chapters.last_page || 1);

          const formattedChapters = rawChapters.map((ch) => ({
            id: ch.id,
            chapterNumber: ch.chapterNumber,
            title: ch.chapterEnglish,
            arabic: ch.chapterArabic,
            hadithCount: ch.hadiths_count || 0
          }));

          setChapters(formattedChapters);
        } else {
          setError(data.message || "Failed to load chapters");
        }
      } catch (err) {
        console.error("Fetch failed:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    fetchChapters();
  }, [bookSlug, currentPage]); // Re-run effect when currentPage changes

  if (loading && chapters.length === 0) {
    return <div className="p-20 text-center dark:text-white">Loading Chapters...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <Link to="/books" className="text-emerald-500 font-medium mb-4 inline-block hover:underline">
            ← Back to All Books
          </Link>
          <h1 className="text-4xl font-bold dark:text-white capitalize">
            {bookSlug.replace(/-/g, ' ')}
          </h1>
          <div className="h-1 w-24 bg-emerald-500 mt-2 rounded-full"></div>
        </header>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg mb-1">Could not load chapters</h3>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <ChapterList chapters={chapters} bookSlug={bookSlug} />
            
            {/* --- Pagination UI --- */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={(page) => setCurrentPage(page)} 
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}