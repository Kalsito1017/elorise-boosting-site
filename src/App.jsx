import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/pages/Home.jsx';
import FAQ from './components/pages/FAQ.jsx';
import { AuthProvider } from './context/AuthContext';
import './App.css';

import DivisionBoost from './components/pages/DivisionBoost.jsx';
import WinsGamesBoost from './components/pages/WinsGamesBoost.jsx';
import PlacementsBoost from './components/pages/PlacementsBoost.jsx';
import Boosters from './components/pages/Boosters.jsx';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <div className="App">
          <Header />
          <main>
            <Routes>
             
              <Route path="/" element={<Home />} />

           
              <Route path="/boosters" element={<Boosters />} />
              <Route path="/faq" element={<FAQ />} />

             
              <Route path="/get-started" element={<DivisionBoost />} />
              <Route path="/get-started/division" element={<DivisionBoost />} />
              <Route path="/get-started/wins-games" element={<WinsGamesBoost />} />
              <Route path="/get-started/placements" element={<PlacementsBoost />} />

              <Route path="/getstarted" element={<Navigate to="/get-started" replace />} />

     
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
