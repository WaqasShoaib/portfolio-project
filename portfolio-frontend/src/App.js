import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageTitleProvider } from './context/PageTitleContext';
import { useTheme, useMediaQuery, CircularProgress, Box } from '@mui/material';

import Header from './layouts/Header';
import SideNav from './layouts/SideNav';
import Footer from './layouts/Footer';
import './App.css';

// Lazy-loaded page components
const Home = lazy(() => import('./pages/Home'));
const Education = lazy(() => import('./pages/Education'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Experience = lazy(() => import('./pages/Experience'));

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [navOpen, setNavOpen] = useState(!isMobile);
  
  // Add meta viewport tag to ensure proper mobile scaling
  useEffect(() => {
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  }, []);

  return (
    <PageTitleProvider>
      <BrowserRouter>
        <div style={{ overflowX: 'hidden', width: '100%' }}>
          <Header onMenuClick={() => setNavOpen(!navOpen)} />  
          <div className="app-container">
            <SideNav open={navOpen} onClose={() => setNavOpen(false)} />
            <main className={`content ${!isMobile && navOpen ? 'content-shifted' : ''}`}>
              <div className="centered-content">
                {/* Suspense boundary for lazy-loaded components with centered spinner */}
                <Suspense fallback={
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '60vh'
                    }}
                  >
                    <CircularProgress />
                  </Box>
                }>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/experience" element={<Experience />} />
                  </Routes>
                </Suspense>
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </PageTitleProvider>
  );
}

export default App;
