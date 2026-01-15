import { useState, useEffect } from 'react'; // Add useEffect
import Login from './auth/Login';
import Register from './auth/Register';

export default function AuthModal({ isOpen, initialMode = 'login', onClose }) {
    const [activeTab, setActiveTab] = useState(initialMode); // 'login' or 'register'

    // Reset activeTab when initialMode changes (when clicking different buttons)
    useEffect(() => {
        setActiveTab(initialMode);
    }, [initialMode]);

    if (!isOpen) return null;

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <div className="auth-modal-header">
                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => setActiveTab('login')}
                        >
                            Sign In
                        </button>
                        <button
                            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => setActiveTab('register')}
                        >
                            Sign Up
                        </button>
                    </div>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="auth-modal-content">
                    {activeTab === 'login' ? (
                        <Login
                            onClose={onClose}
                            onSwitchToRegister={() => setActiveTab('register')}
                        />
                    ) : (
                        <Register
                            onClose={onClose}
                            onSwitchToLogin={() => setActiveTab('login')}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}