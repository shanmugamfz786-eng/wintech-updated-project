import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Courses from './components/Courses';
import Services from './components/Services';
import DistanceEdu from './components/DistanceEdu';
import WhyAndStories from './components/WhyAndStories';
import Stats from './components/Stats';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import SearchModal from './components/SearchModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ITServicesPage from './components/ITServicesPage';
import ITCoursesPage from './components/ITCoursesPage';
import DistanceEduPage from './components/DistanceEduPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const getInitialPage = () => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash === '#admin') return 'admin';
    if (hash === '#contact') return 'contact';
    if (hash === '#about') return 'about';
    if (hash === '#distance' || hash === '#dist-featured') return 'distance';
    if (hash === '#courses' || hash === '#top-courses') return 'courses';
    if (hash === '#services' || hash === '#featured-projects' || hash === '#services-offer') return 'services';
    return 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Sync with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setActivePage('admin');
      } else if (hash === '#contact') {
        setActivePage('contact');
      } else if (hash === '#about') {
        setActivePage('about');
      } else if (hash === '#distance' || hash === '#dist-featured') {
        setActivePage('distance');
      } else if (hash === '#courses' || hash === '#top-courses') {
        setActivePage('courses');
      } else if (hash === '#services' || hash === '#featured-projects' || hash === '#services-offer') {
        setActivePage('services');
      } else if (hash === '#home' || hash === '') {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setActivePage(page);
    if (page === 'admin') {
      window.location.hash = '#admin';
    } else if (page === 'contact') {
      window.location.hash = '#contact';
    } else if (page === 'about') {
      window.location.hash = '#about';
    } else if (page === 'distance') {
      window.location.hash = '#distance';
    } else if (page === 'courses') {
      window.location.hash = '#courses';
    } else if (page === 'services') {
      window.location.hash = '#services';
    } else {
      window.location.hash = '#home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      {/* Navigation (Hidden on Admin portal for clean management workspace) */}
      {activePage !== 'admin' && (
        <Navbar
          activePage={activePage}
          onNavigate={handleNavigate}
          onOpenEnquiry={() => setEnquiryOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
        />
      )}

      {/* Main Content Area */}
      <main id="main-content">
        {activePage === 'admin' ? (
          <AdminDashboard onNavigate={handleNavigate} />
        ) : activePage === 'contact' ? (
          <ContactPage
            onOpenEnquiry={() => setEnquiryOpen(true)}
            onNavigate={handleNavigate}
          />
        ) : activePage === 'about' ? (
          <AboutPage
            onOpenEnquiry={() => setEnquiryOpen(true)}
            onNavigate={handleNavigate}
          />
        ) : activePage === 'distance' ? (
          <DistanceEduPage
            onOpenEnquiry={() => setEnquiryOpen(true)}
            onNavigate={handleNavigate}
          />
        ) : activePage === 'courses' ? (
          <ITCoursesPage
            onOpenEnquiry={() => setEnquiryOpen(true)}
            onNavigate={handleNavigate}
          />
        ) : activePage === 'services' ? (
          <ITServicesPage
            onOpenEnquiry={() => setEnquiryOpen(true)}
            onNavigate={handleNavigate}
          />
        ) : (
          <>
            <Hero onOpenEnquiry={() => setEnquiryOpen(true)} />
            <Brands
              onNavigateServices={() => handleNavigate('services')}
              onNavigateCourses={() => handleNavigate('courses')}
              onNavigateDistance={() => handleNavigate('distance')}
            />
            <Courses onOpenEnquiry={() => setEnquiryOpen(true)} />
            <Services onOpenEnquiry={() => setEnquiryOpen(true)} />
            <DistanceEdu onOpenEnquiry={() => setEnquiryOpen(true)} />
            <WhyAndStories />
            <Stats />
            <CtaBanner onOpenEnquiry={() => setEnquiryOpen(true)} />
            <Footer onOpenEnquiry={() => setEnquiryOpen(true)} />
          </>
        )}
      </main>

      {/* Interactive Modals */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Floating Action (Suppressed on ContactPage and AdminDashboard) */}
      {activePage !== 'contact' && activePage !== 'admin' && <FloatingWhatsApp />}
    </div>
  );
}
