import HadithDetail from "../components/hadith/HadithDetail";
import { useParams, Link } from "react-router-dom";

export default function HadithPage() {
  const { bookSlug, chapterNumber, hadithId } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Navigation Header */}
        <nav className="mb-8">
          <Link 
            to={`/books/${bookSlug}/chapters/${chapterNumber}`} 
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
          >
            ← Back to Chapter {chapterNumber}
          </Link>
        </nav>

        {/* This is where the magic happens */}
        <HadithDetail />
      </div>
    </div>
  );
}