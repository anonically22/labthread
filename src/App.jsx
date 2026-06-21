import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Tips from './pages/Tips';
import Ask from './pages/Ask';
import MaintenancePage from './pages/MaintenancePage';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { getSettings } from './utils/settingsStore';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSettings(getSettings());
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!settings) return null;

  const maintenance = settings.maintenanceMode;

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      <Router>
        <Routes>
          {/* Admin Routes - temporarily disabled */}
          {/* Public Routes - behind maintenance mode */}
          {maintenance ? (
            <Route path="*" element={<MaintenancePage />} />
          ) : (
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="tips" element={<Tips />} />
              <Route path="ask" element={<Ask />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
