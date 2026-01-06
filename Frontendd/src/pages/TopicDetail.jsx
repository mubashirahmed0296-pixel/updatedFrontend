import { useParams, Link } from "react-router-dom";

// --- DATA SOURCE ---
// You can add more topics here easily. 
// The key (e.g., "anger") must match the slug in Topics.jsx
const TOPIC_EXPLANATIONS = {
  "medicine": {
    title: "Prophetic Medicine",
    subtitle: "Tibb-e-Nabwi: Healing for the Heart & Body",
    category: "Wellness",
    body: "Prophetic Medicine refers to the guidance given by the Prophet Muhammad ﷺ regarding health, sickness, and hygiene. It is not just about physical cures; it focuses on the holistic well-being of a person. It encourages the use of natural substances—like honey, black seed, and olive oil—while emphasizing that the ultimate healer is Allah.",
    practicalPoints: [
      "Moderation in food and drink to prevent illness.",
      "The use of black seed as a cure for many ailments.",
      "The importance of mental health through Dhikr and prayer."
    ],
    closing: "A healthy believer is more beloved to Allah than a weak one."
  },
  "anger": {
    title: "Anger Management",
    subtitle: "Finding Strength in Self-Control",
    category: "Character",
    body: "In the Sunnah, true strength is not defined by physical power or wrestling ability. Instead, the Prophet ﷺ taught that the strongest person is the one who controls themselves during a fit of rage. Anger is seen as a spark from Shaytan that can be extinguished through specific spiritual and physical actions.",
    practicalPoints: [
      "Changing physical posture: If standing, sit down; if sitting, lie down.",
      "Performing Wudu to cool the physical and spiritual heat of anger.",
      "Seeking refuge in Allah (Saying A'udhu billah) immediately."
    ],
    closing: "Do not become angry, and for you is Paradise."
  },
  "patience": {
    title: "Patience (Sabr)",
    subtitle: "Steadfastness in the Face of Trials",
    category: "Spirituality",
    body: "Sabr is often translated as patience, but it encompasses endurance, perseverance, and restraint. It is the ability to hold back the soul from despair and the tongue from complaining. It is a light for the believer, providing clarity when life becomes difficult.",
    practicalPoints: [
      "Sabr at the first stroke of a calamity.",
      "Remaining constant in worship even when motivation is low.",
      "Restraining the tongue from speaking ill during anger."
    ],
    closing: "Truly, Allah is with those who are patient."
  },
  "eating": {
    title: "Manners of Eating",
    subtitle: "Blessings in Every Bite",
    category: "Lifestyle",
    body: "In the Sunnah, eating is not merely a biological necessity but a spiritual act that begins with gratitude and ends with praise. The Prophet ﷺ taught us that barakah (blessing) descends upon food when certain etiquettes are followed, ensuring that the food nourishes both the body and the soul.",
    practicalPoints: [
      "Saying 'Bismillah' (In the name of Allah) before starting to eat.",
      "Eating with the right hand and eating from what is directly in front of you.",
      "Licking the fingers and cleaning the plate to ensure no blessing is wasted.",
      "Sitting down while drinking and taking three breaths between sips."
    ],
    closing: "Eat together and do not separate, for the blessing is with the group."
  }
};

export default function TopicDetail() {
  const { slug } = useParams();
  const data = TOPIC_EXPLANATIONS[slug];

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-slate-950">
        <p className="text-sm text-slate-500 mb-4">Content not found.</p>
        <Link to="/topics" className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Back to Topics</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-16 px-6 transition-colors">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation */}
        <Link to="/topics" className="text-[10px] font-black tracking-[0.3em] text-slate-400 hover:text-emerald-500 transition-colors uppercase">
          ← Overview
        </Link>
        
        {/* Header */}
        <header className="mt-12 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-6 bg-emerald-500/50"></span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              {data.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            {data.title}
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 italic">
            {data.subtitle}
          </p>
        </header>

        {/* Content Body */}
        <article className="space-y-12">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-base leading-[1.8] text-slate-700 dark:text-slate-300">
              {data.body}
            </p>
          </div>

          {/* Practical Steps Box */}
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-10">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-8">
              Practical Implementation
            </h3>
            <ul className="space-y-6">
              {data.practicalPoints.map((point, index) => (
                <li key={index} className="flex gap-5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-emerald-500 shadow-sm">
                    {index + 1}
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Wisdom Quote */}
          <footer className="pt-12 border-t border-slate-100 dark:border-slate-900 text-center">
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 italic">
              "{data.closing}"
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}