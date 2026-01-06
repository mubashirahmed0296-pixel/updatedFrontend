import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookCard from "./BookCard";

/**
 * Animation variants for staggered card appearance
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          "https://hadithapi.com/api/books?apiKey=$2y$10$3XWI8hS5ZeHDPZmnUIQGuegOgBWD1msk5PHgg3ljR2ScBx2DjMry"
        );

        // HTTP-level validation
        if (!res.ok) {
          throw new Error("Server responded with an error");
        }

        const data = await res.json();

        // API-level validation
        if (data.status !== 200 || !data.books) {
          throw new Error("Invalid API response");
        }

        const formattedBooks = data.books.map((book) => ({
          id: book.id,
          title: book.bookName,
          hadithCount: book.hadiths_count,
          slug: book.bookSlug,
        }));

        setBooks(formattedBooks);
      } catch (err) {
        console.error("Failed to load Hadith books:", err);
        setError("Unable to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /* =========================
     CONDITIONAL UI STATES
     ========================= */

  // Loading state
  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-96 flex items-center justify-center text-red-500 font-medium">
        {error}
      </div>
    );
  }

  // Empty state
  if (books.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center text-slate-500">
        No Hadith collections available at the moment.
      </div>
    );
  }

  /* =========================
     MAIN UI
     ========================= */

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Primary <span className="text-emerald-600">Collections</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Browse through the most authentic sources of Hadith literature.
          </p>
        </div>
        <div className="hidden md:block h-px flex-grow mx-8 bg-slate-200 dark:bg-slate-800 mb-2" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </motion.div>
    </section>
  );
}
