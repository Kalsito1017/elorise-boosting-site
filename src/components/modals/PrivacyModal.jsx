export default function PrivacyModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const privacymodal = `
       Privacy Policy

Last updated: January 2026

Welcome to EloRise (“we”, “us”, “our”). This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.

1. Information We Collect

We may collect the following types of information:

1.1 Personal Information

Email address

Username or display name

Payment-related information (processed by third-party providers)

1.2 Technical Information

IP address

Browser type and version

Device information

Pages visited and usage data

2. How We Use Your Information

We use collected information to:

Provide and manage our services

Process orders and payments

Communicate with users regarding orders or support

Improve website functionality and user experience

Prevent fraud and unauthorized access

3. Cookies & Tracking

EloRise may use cookies or similar technologies to:

Maintain session functionality

Analyze website traffic

Improve performance and usability

You may disable cookies through your browser settings.

4. Data Sharing

We do not sell personal data.
Information may be shared only with:

Payment processors

Hosting and infrastructure providers

Legal authorities when required by law

5. Data Security

We implement reasonable technical and organizational measures to protect your data. However, no method of transmission or storage is 100% secure.

6. Data Retention

We retain personal data only as long as necessary to provide services or comply with legal obligations.

7. User Rights

Depending on your location, you may have the right to:

Access your personal data

Request correction or deletion

Withdraw consent

Request data portability

Requests can be sent to the contact address below.

8. Third-Party Services

EloRise may contain links to third-party websites or services. We are not responsible for their privacy practices.

9. Children’s Privacy

EloRise does not knowingly collect information from individuals under the age of 18.

10. Changes to This Policy

We may update this Privacy Policy at any time. Changes will be posted on this page.
    `;

    return (
        <div className="modal-overlay terms-overlay" onClick={onClose}>
            <div className="terms-modal" onClick={(e) => e.stopPropagation()}>
                <div className="terms-modal-header">
                    <h2>Privacy Policy</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="terms-modal-content">
                    <div className="terms-scrollable">
                        <pre className="terms-text">{privacymodal}</pre>
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