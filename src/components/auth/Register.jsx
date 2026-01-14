import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PasswordInput from './PasswordInput';
import TermsModal from '../modals/TermsModal';
import PrivacyModal from '../modals/PrivacyModal';

export default function Register({ onClose, onSwitchToLogin }) {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const { register, error: authError, clearError } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!agreeTerms) {
            alert('You must agree to the Terms of Service');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        setIsLoading(true);
        clearError();

        const result = await register(email, password, displayName);

        if (result.success) {
            onClose();
        }

        setIsLoading(false);
    };

    const openTermsModal = () => {
        setShowTermsModal(true);
    };
    const openPrivacyModal = () => {
        setShowPrivacyModal(true);
    }

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
                        <label htmlFor="displayName">Display Name (Optional)</label>
                        <input
                            type="text"
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Your name"
                            disabled={isLoading}
                            autoComplete="name"
                        />
                        <small className="input-hint">This name will appear on your profile</small>
                    </div>

                    <div className="form-group">
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            id="password"
                            label="Password"
                            showStrength={true}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <PasswordInput
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            id="confirmPassword"
                            label="Confirm Password"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">

                            <span>
                                I agree to the{' '}
                                <button
                                    type="button"
                                    className="terms-link"
                                    onClick={openTermsModal}
                                >
                                    Terms of Service
                                </button>
                                {' '}and{' '}
                                <button
                                    type="button"
                                    className="terms-link"
                                    onClick={openPrivacyModal}
                                >
                                    Privacy Policy
                                </button>
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    disabled={isLoading}
                                    required
                                />
                            </span>

                        </label>
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
                                Creating Account...
                            </>
                        ) : 'CREATE ACCOUNT'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account?{' '}
                        <button
                            type="button"
                            className="switch-btn"
                            onClick={onSwitchToLogin}
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>

            <TermsModal
                isOpen={showTermsModal}
                onClose={() => setShowTermsModal(false)}
            />
            <PrivacyModal
                isOpen={showPrivacyModal}
                onClose={() => setShowPrivacyModal(false)}
            />
        </>
    );
}