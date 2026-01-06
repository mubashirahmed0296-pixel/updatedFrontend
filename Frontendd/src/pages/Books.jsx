import BooksList from "../components/books/BooksList";

export default function Books() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <header className="flex flex-col items-center mb-1">
        {/* Unique floating badge */}
       
        
        <h1 className="text-4xl font-light text-slate-900 dark:text-white tracking-tighter">
          Hadith <span className="font-black text-emerald-600 dark:text-emerald-500">Books</span>
        </h1>
        
        {/* Minimalist geometric divider */}
        <div className="flex items-center gap-2 mt-6">
          <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="w-8 h-[1px] bg-slate-100 dark:bg-slate-800" />
          <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </header>

      <BooksList />
    </div>
  );
}