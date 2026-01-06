import { motion } from "framer-motion";
import { FaGithub, FaGlobe, FaFacebook, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500 mt-32">
      
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sunnah<span className="text-emerald-600">Search</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Dedicated to providing a high-quality, digital experience for students of knowledge to explore authentic Hadith collections.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/books" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Hadith Books</Link></li>
              <li><Link to="/topics" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Topics</Link></li>
              <li><Link to="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About Project</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">API Access</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Open Source</a></li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">
              Community
            </h4>
            <div className="flex items-center gap-4 text-xl text-slate-400">
              {[
                { icon: <FaGithub />, link: "#" },
                { icon: <FaFacebook />, link: "#" },
                { icon: <FaTwitter />, link: "#" },
                { icon: <FaGlobe />, link: "#" }
              ].map((item, idx) => (
                <motion.a 
                  key={idx}
                  whileHover={{ y: -3, scale: 1.1 }}
                  href={item.link}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-500 text-xs">
            © {new Date().getFullYear()} Sunnah Search. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Built by</span>
            <span className="font-bold text-slate-900 dark:text-slate-200">Huzaifa & Muddasar & Mubashir</span>
            {/* <span>with</span> */}
            {/* <span className="text-emerald-500 animate-pulse">❤</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;