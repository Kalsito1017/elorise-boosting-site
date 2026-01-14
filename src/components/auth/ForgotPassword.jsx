import { useState } from 'react';

export default function ForgotPassword({ onClose, onSwitchToLogin }) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    // Support for Formspree free tier
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqqwaow";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    subject: 'Password Reset Request - EloRise',
                    message: `Password reset requested for ${email}. Please follow the link below to reset your password.`
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setEmail('');
            } else {
                throw new Error('Failed to send reset email');
            }
        } catch (err) {
            setError('Failed to send reset email. Please try again later.');
            console.error('Formspree error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = () => {
        setIsSubmitted(false);
        setError('');
    };

    return (
        <div className="forgot-password-modal">
            <div className="modal-header">
                <h2>Reset Password</h2>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="modal-content">
                {isSubmitted ? (
                    <div className="success-message">
                        <div className="success-icon">✅</div>
                        <h3>Check Your Email</h3>
                        <p>
                            We've sent password reset instructions to <strong>{email}</strong>.
                            Please check your inbox and follow the link to reset your password.
                        </p>
                        <p className="note">
                            If you don't see the email, check your spam folder.
                        </p>
                        <div className="success-actions">
                            <button
                                className="btn-primary"
                                onClick={onClose}
                            >
                                Back to Login
                            </button>
                            <button
                                className="btn-secondary"
                                onClick={handleResend}
                            >
                                Resend Email
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="forgot-instructions">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        <form onSubmit={handleSubmit} className="forgot-form">
                            <div className="form-group">
                                <label htmlFor="forgot-email">Email Address</label>
                                <input
                                    type="email"
                                    id="forgot-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    disabled={isLoading}
                                    autoComplete="email"
                                />
                            </div>

                            {error && (
                                <div className="auth-error">
                                    <span className="error-icon">⚠️</span>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="auth-btn primary"
                                disabled={isLoading || !email}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        Sending...
                                    </>
                                ) : 'Send Reset Link'}
                            </button>
                        </form>

                        <div className="forgot-footer">
                            <button
                                type="button"
                                className="back-btn"
                                onClick={onSwitchToLogin}
                            >
                                ← Back to Sign In
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}