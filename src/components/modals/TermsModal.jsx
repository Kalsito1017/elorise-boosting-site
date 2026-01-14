export default function TermsModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const termsContent = `
        TERMS OF SERVICE FOR ELORISE BOOSTING SERVICE

        1. ACCEPTANCE OF TERMS
        By accessing and using the EloRise service, you accept and agree to be bound by these Terms of Service.

        2. SERVICE DESCRIPTION
        EloRise provides professional League of Legends account boosting services. Our services include but are not limited to rank boosting, placement matches, and win boosting.

        3. ACCOUNT SAFETY
        3.1 We use VPN and offline mode to ensure 100% account safety.
        3.2 We are not responsible for any penalties imposed by Riot Games.
        3.3 Users must provide accurate account information and ensure they own the accounts being boosted.

        4. PAYMENT AND REFUNDS
        4.1 All payments are processed through secure payment gateways.
        4.2 Refunds are available within 24 hours of purchase if service hasn't started.
        4.3 Completed services are non-refundable.

        5. USER RESPONSIBILITIES
        5.1 You must be at least 18 years old to use our services.
        5.2 You agree not to share your account credentials with anyone else.
        5.3 You acknowledge that account sharing may violate Riot Games' Terms of Service.

        6. PRIVACY POLICY
        6.1 We collect minimal personal information necessary for service delivery.
        6.2 All account information is encrypted and stored securely.
        6.3 We never share your personal information with third parties without consent.

        7. SERVICE GUARANTEE
        7.1 We guarantee rank achievement as specified in your order.
        7.2 If we fail to deliver, you may request a partial or full refund based on progress.
        7.3 Completion times are estimates and may vary based on queue times and other factors.

        8. LIMITATION OF LIABILITY
        8.1 EloRise is not affiliated with Riot Games.
        8.2 We are not responsible for any account suspensions or bans.
        8.3 Maximum liability is limited to the amount paid for services.

        9. TERMINATION
        9.1 We reserve the right to terminate service for violation of these terms.
        9.2 Users may cancel service with applicable refund policies.

        10. CHANGES TO TERMS
        10.1 We may update these terms at any time.
        10.2 Continued use of service constitutes acceptance of new terms.

        11. CONTACT INFORMATION
        For questions about these terms, contact: support@elorise.com

        Last Updated: January 13, 2026
    `;

    return (
        <div className="modal-overlay terms-overlay" onClick={onClose}>
            <div className="terms-modal" onClick={(e) => e.stopPropagation()}>
                <div className="terms-modal-header">
                    <h2>Terms of Service</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="terms-modal-content">
                    <div className="terms-scrollable">
                        <pre className="terms-text">{termsContent}</pre>
                    </div>
                </div>

                <div className="terms-modal-footer">
                    <button className="btn-primary" onClick={onClose}>
                        I Understand
                    </button>
                </div>
            </div>
        </div>
    );
}