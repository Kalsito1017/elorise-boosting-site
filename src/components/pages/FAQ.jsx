import { useState } from 'react';
import './FAQ.css';

const faqs = [
    {
        question: "Is EloRise boosting service safe for my account?",
        answer: "Absolutely! We use VPN and offline mode during boosting sessions to ensure 100% account safety. Our boosters never chat or interact with other players, and we follow all best practices to minimize detection risk. However, we cannot guarantee 100% safety as account sharing is against Riot's Terms of Service."
    },
    {
        question: "How long does a rank boost usually take?",
        answer: "Boost duration depends on several factors: your current rank, desired rank, queue times, and win rates. Generally, a division boost takes 1-3 days, while a full tier boost can take 3-7 days. We provide estimated completion times when you place your order."
    },
    {
        question: "Can I play on my account while it's being boosted?",
        answer: "No, for safety and efficiency reasons, you cannot access your account during the boosting process. Our system detects any login attempts and pauses the boost. This prevents any suspicious activity that could trigger Riot's detection systems."
    },
    {
        question: "Do I need to provide my password?",
        answer: "Yes, you'll need to provide your account credentials for our boosters to access the account. We use encrypted, secure channels to receive and store this information temporarily. You can change your password immediately after the boost is completed."
    },
    {
        question: "What happens if I get a penalty during the boost?",
        answer: "In the rare event that your account receives any penalty during our service, we offer a full refund or free re-boost to your desired rank. Our safety measures make this extremely unlikely, but we stand by our service guarantee."
    },
    {
        question: "Can I choose specific champions or playstyles?",
        answer: "Yes! You can specify champion preferences and playstyle requests. Our boosters will try to accommodate these requests when possible, but we prioritize win rate and efficiency to complete your boost as quickly as possible."
    },
    {
        question: "Do you offer duo queue boosting?",
        answer: "Yes, we offer duo queue services where you can play alongside one of our boosters. This is a great option if you want to learn from a professional player while ranking up. Duo queue is available for most ranks and regions."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards (Visa, MasterCard, American Express), PayPal, and cryptocurrency (Bitcoin, Ethereum). All payments are processed through secure, encrypted payment gateways."
    },
    {
        question: "Is there a money-back guarantee?",
        answer: "Yes! We offer a 100% money-back guarantee if we fail to deliver your requested rank within the estimated time frame. We also offer partial refunds for incomplete boosts and a 24-hour cancellation policy for unstarted orders."
    },
    {
        question: "How do I track my boost progress?",
        answer: "Once your boost starts, you'll receive a private dashboard link where you can track progress in real-time. You'll see current rank, LP gained, games played, win rate, and estimated completion time. You can also communicate directly with your booster through our secure chat system."
    }
];

const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'safety', name: 'Safety & Security' },
    { id: 'process', name: 'Boosting Process' },
    { id: 'payment', name: 'Payment & Refunds' },
    { id: 'technical', name: 'Technical Support' }
];

export default function FAQ() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [openIndex, setOpenIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFaqs = faqs.filter(faq => {
        if (searchQuery) {
            return faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setOpenIndex(null); // Close all FAQs when searching
    };

    return (
        <main className="faq-page">
            {/* Hero Section */}
            <section className="faq-hero">
                <div className="faq-hero-content">
                    <h1>Frequently Asked Questions</h1>
                    <p>Find answers to common questions about our boosting services</p>
                </div>
            </section>

            {/* Search Bar */}
            <section className="faq-search">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for questions..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="faq-search-input"
                    />
                    <span className="search-icon">🔍</span>
                    {searchQuery && (
                        <button
                            className="clear-search"
                            onClick={() => setSearchQuery('')}
                        >
                            Clear
                        </button>
                    )}
                </div>
                <p className="search-hint">
                    {searchQuery ? `Found ${filteredFaqs.length} result${filteredFaqs.length !== 1 ? 's' : ''}` : 'Type to search FAQs'}
                </p>
            </section>



            {/* FAQ List */}
            <section className="faq-list">
                <div className="faq-container">
                    <h2>Common Questions</h2>

                    {filteredFaqs.length > 0 ? (
                        <div className="faq-items">
                            {filteredFaqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`faq-item ${openIndex === index ? 'open' : ''}`}
                                >
                                    <div
                                        className="faq-question"
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <h3>{faq.question}</h3>
                                        <span className="faq-toggle">
                                            {openIndex === index ? '−' : '+'}
                                        </span>
                                    </div>
                                    <div className="faq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon">❓</div>
                            <h3>No questions found</h3>
                            <p>Try different search terms or browse all questions</p>
                            <button
                                className="btn-reset"
                                onClick={() => setSearchQuery('')}
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>
            </section>


        </main>
    );
}