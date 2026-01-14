import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PasswordInput from './PasswordInput';
import ForgotPassword from './ForgotPassword'; // Add this import

export default function Login({ onClose, onSwitchToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false); // Add this state
    const { login, error: authError, clearError } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        clearError();

        const result = await login(email, password, rememberMe);

        if (result.success) {
            onClose();
        }

        setIsLoading(false);
    };

    const handleDemoLogin = async () => {
        setIsLoading(true);
        clearError();
        const result = await login('demo@example.com', 'demo123', false);

        if (result.success) {
            onClose();
        }

        setIsLoading(false);
    };

    const handleForgotPassword = () => {
        setShowForgotPassword(true);
    };

    return (
        <>
            <div className="auth-form-container">
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            disabled={isLoading}
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            id="password"
                            label="Password"
                            disabled={isLoading}
                        />
                        <div className="password-options">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    disabled={isLoading}
                                />
                                <span>Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="forgot-btn"
                                onClick={handleForgotPassword}
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>

                    {authError && (
                        <div className="auth-error">
                            <span className="error-icon">⚠️</span>
                            {authError}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-btn primary"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-small"></span>
                                Signing in...
                            </>
                        ) : 'Sign In'}
                    </button>

                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    <button
                        type="button"
                        className="auth-btn demo"
                        onClick={handleDemoLogin}
                        disabled={isLoading}
                    >
                        Try Demo Account
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account?{' '}
                        <button
                            type="button"
                            className="switch-btn"
                            onClick={onSwitchToRegister}
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="modal-overlay" onClick={() => setShowForgotPassword(false)}>
                    <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                        <ForgotPassword
                            onClose={() => setShowForgotPassword(false)}
                            onSwitchToLogin={() => setShowForgotPassword(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}