import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import Pagination from "../ui/Pagination";
import HadithCard from "../hadith/HadithCard";

/**
 * HadithList
 * Displays paginated Hadiths of a chapter with search.
 */
export default function HadithList() {

  const { bookSlug, chapterNumber } = useParams();

  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHadiths = async () => {
      setLoading(true);
      setError(null);

      try {
        const url =
          `https://hadithapi.com/api/hadiths?apiKey=YOUR_API_KEY` +
          `&book=${bookSlug}&chapter=${chapterNumber}&paginate=10&page=${currentPage}` +
          (search ? `&hadithEnglish=${search}` : "");

        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to fetch hadiths");

        const data = await res.json();

        if (data.status !== 200) throw new Error("Invalid API response");

        setHadiths(
          data.hadiths.data.map(h => ({
            id: h.id,
            hadithNumber: h.hadithNumber,
            arabic: h.hadithArabic,
            english: h.hadithEnglish,
            urdu: h.hadithUrdu,
            narrator: h.englishNarrator,
          }))
        );

        setTotalPages(data.hadiths.last_page);
      } catch (err) {
        setError("Unable to load hadiths.");
      } finally {
        setLoading(false);
      }
    };

    fetchHadiths();
  }, [bookSlug, chapterNumber, currentPage, search]);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  if (hadiths.length === 0) {
    return <div className="py-20 text-center">No Hadiths found.</div>;
  }

  return (
    <>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
      <div className="grid md:grid-cols-2 gap-6">
        {hadiths.map(h => (
          <HadithCard key={h.id} hadith={h} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
