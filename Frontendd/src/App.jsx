import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext"; // Ensure this is imported
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // Import your Bouncer

// Pages
import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import SingleBookPage from "./pages/SingleBookPage";
import ChapterPage from "./pages/ChapterPage";
import HadithPage from "./pages/HadithPage";
import PrayerTimings from "./pages/PrayerTimings";
import QuranPage from "./pages/QuranPage";
import Topics from "./pages/Topics";         
import TopicDetail from "./pages/TopicDetail"; 
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    
    <AuthProvider> {/* 1. Wrap with AuthProvider */}
      <ThemeProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
                {/* --- Public Routes --- */}
                <Route path="/" element={<Home />} />
                <Route path="/prayer" element={<PrayerTimings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp/>} />
                
                {/* --- Protected Quran Route --- */}
                <Route path="/quran" element={
                  <ProtectedRoute>
                    <QuranPage />
                  </ProtectedRoute>
                } />

                {/* --- Protected Topics Routes --- */}
                <Route path="/topics" element={
                  <ProtectedRoute>
                    <Topics />
                  </ProtectedRoute>
                } />
                <Route path="/topics/:slug" element={
                  <ProtectedRoute>
                    <TopicDetail />
                  </ProtectedRoute>
                } />

                {/* --- Protected Books Routes --- */}
                <Route path="/books" element={
                  <ProtectedRoute>
                    <Books />
                  </ProtectedRoute>
                } />
                
                <Route path="/books/:bookSlug" element={
                  <ProtectedRoute>
                    <SingleBookPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/books/:bookSlug/chapters/:chapterNumber" element={
                  <ProtectedRoute>
                    <ChapterPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/books/:bookSlug/chapters/:chapterNumber/hadith/:hadithId" element={
                  <ProtectedRoute>
                    <HadithPage />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
    
  );
}