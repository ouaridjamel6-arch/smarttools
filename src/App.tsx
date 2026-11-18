import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ToolPage } from './pages/ToolPage';
import { PrivacyPage, TermsPage, AboutPage, ContactPage } from './pages/LegalPages';
import { NotFoundPage } from './pages/NotFoundPage';
import { GrowthCenterLayout } from './pages/growth/GrowthCenterLayout';
import { AnalyticsService } from './services/analyticsService';

// Scroll to top & page view analytics tracker
const RouteChangeTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    AnalyticsService.trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

// Public Layout Wrapper
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  useEffect(() => {
    AnalyticsService.initGa();
  }, []);

  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Routes>
        {/* Public Routes with Header & Footer */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path="/tool/:toolSlug"
          element={
            <PublicLayout>
              <ToolPage />
            </PublicLayout>
          }
        />
        <Route
          path="/privacy"
          element={
            <PublicLayout>
              <PrivacyPage />
            </PublicLayout>
          }
        />
        <Route
          path="/terms"
          element={
            <PublicLayout>
              <TermsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          }
        />
        <Route
          path="/404"
          element={
            <PublicLayout>
              <NotFoundPage />
            </PublicLayout>
          }
        />

        {/* Private Administration Route */}
        <Route path="/growth-center" element={<GrowthCenterLayout />} />

        {/* Wildcard Fallback */}
        <Route
          path="*"
          element={
            <PublicLayout>
              <NotFoundPage />
            </PublicLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
