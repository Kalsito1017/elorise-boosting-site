import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'; // Add useLocation here
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/pages/Home.jsx';
import Boosters from './components/pages/Boosters.jsx';
import FAQ from './components/pages/FAQ.jsx';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import GetStarted from './components/pages/GetStarted.jsx';
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
              <Route path="/getstarted" element={<GetStarted />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;