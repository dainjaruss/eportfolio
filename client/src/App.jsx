import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/App.css';

import Header  from './components/layout/Header';
import Footer  from './components/layout/Footer';
import Home    from './pages/Home';
import About   from './pages/About';
import Skills  from './components/Skills';
import Resume  from './pages/Resume';
import Admin   from './pages/Admin';

// these two now live in /pages and connect to the express backend
import Projects from './pages/Projects';
import Contact  from './pages/Contact';

import skillsData from './data/skills.json';

// tab router replaced with React Router so the URL actually changes
const navLinks = [
  { path: '/',         label: 'Home' },
  { path: '/about',    label: 'About Me' },
  { path: '/skills',   label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/resume',   label: 'Resume' },
  { path: '/contact',  label: 'Contact' },
  { path: '/admin',    label: 'Admin' },
];

const App = () => {
  const [themeMode, setThemeMode] = useState('light');

  // keep the DOM attribute in sync so CSS variables pick up the right theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const onToggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <a className="skip-link" href="#main-content">Skip to content</a>

        <Header
          navLinks={navLinks}
          themeMode={themeMode}
          onToggleTheme={onToggleTheme} />

        <main id="main-content">
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<About />} />
            <Route path="/skills"   element={<Skills technicalData={skillsData} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume"   element={<Resume />} />
            <Route path="/contact"  element={<Contact />} />
            <Route path="/admin"    element={<Admin />} />
            <Route path="*"         element={<section className="page-section"><p>Page not found.</p></section>} />
          </Routes>
        </main>

        <Footer navLinks={navLinks} />
      </div>
    </BrowserRouter>
  );
};

export default App;
