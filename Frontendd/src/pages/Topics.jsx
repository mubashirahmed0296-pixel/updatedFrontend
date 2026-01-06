import TopicCard from "../components/topics/TopicCard";
import { Link } from "react-router-dom";

// This is your "Database". Add new topics here.
const TOPICS_DATA = [
  {
    slug: "medicine",
    title: "Prophetic Medicine",
    category: "Wellness",
    intro: "A holistic approach to health based on the guidance of the Prophet ﷺ.",
    featured: true
  },
  {
    slug: "patience",
    title: "Patience (Sabr)",
    category: "Character",
    intro: "Maintaining a beautiful attitude during trials and ease.",
    featured: false
  },
  {
    slug: "eating",
    title: "Manners of Eating",
    category: "Lifestyle",
    intro: "Transforming a daily necessity into an act of worship.",
    featured: false
  },
  {
    slug: "anger",
    title: "Anger Management",
    category: "Character",
    intro: "Strength is not in physical power, but in controlling one's soul.",
    featured: false
  }
];

export default function Topics() {
  const featuredTopic = TOPICS_DATA.find(t => t.featured) || TOPICS_DATA[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* --- REFINED BANNER --- */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em] mb-4 block">
                Featured Insight
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                {featuredTopic.title}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                {featuredTopic.intro} explore the profound wisdom behind this topic and learn how to apply it in your contemporary life.
              </p>
              <Link 
                to={`/topics/${featuredTopic.slug}`}
                className="inline-block px-8 py-3 bg-slate-900 dark:bg-emerald-600 text-white text-[10px] font-bold rounded-xl hover:opacity-90 transition-all uppercase tracking-widest"
              >
                Read Explanation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- TOPICS GRID --- */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">All Topics</h2>
          <div className="h-[1px] flex-grow bg-slate-200 dark:bg-slate-800"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS_DATA.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>
    </div>
  );
}