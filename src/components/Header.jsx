import { useState } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
    const { isAuthenticated, user } = useAuth();

    const handleLoginClick = () => {
        setAuthMode('login');
        setAuthModalOpen(true);
    };

    const handleRegisterClick = () => {
        setAuthMode('register');
        setAuthModalOpen(true);
    };

    return (
        <>
            <header className="header">
                <div className="header-content">
                    <div className="header-left">
                        <Link to="/" className="logo-link">
                            <h1 className="logo">EloRise</h1>
                        </Link>
                        <nav className="main-nav">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/boosters" className="nav-link">Boosters</Link>

                            <Link to="/faq" className="nav-link">FAQ</Link>
                        </nav>
                    </div>

                    <div className="header-right">
                        <div className="header-actions">
                            {isAuthenticated ? (
                                <UserProfile user={user} />
                            ) : (
                                <div className="auth-buttons">
                                    <button
                                        className="auth-btn login-btn"
                                        onClick={handleLoginClick}
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        className="auth-btn register-btn primary"
                                        onClick={handleRegisterClick}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <AuthModal
                isOpen={authModalOpen}
                initialMode={authMode}
                onClose={() => setAuthModalOpen(false)}
            />
        </>
    );
}