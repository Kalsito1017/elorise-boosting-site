import { useState, useEffect, useRef } from 'react';
import heroVideo from "@/assets/Spirit-Blossom-Kindred-Animated-Wallpaper.mp4";
import './Home.css';
import { Link } from 'react-router-dom';


const features = [
    {
        title: "Professional Boosters",
        description: "Our boosters are all high-elo professionals who will handle your account with care.",
        icon: "🏆"
    },
    {
        title: "Safe & Secure",
        description: "We use VPN and offline mode to ensure 100% account safety.",
        icon: "🔒"
    },
    {
        title: "24/7 Support",
        description: "Our support team is available round the clock to assist you.",
        icon: "💬"
    },
    {
        title: "Fast Delivery",
        description: "Get your desired rank faster with our optimized boosting system.",
        icon: "⚡"
    },
    {
        title: "Money Back Guarantee",
        description: "Full refund if we don't deliver your rank as promised.",
        icon: "💰"
    },
    {
        title: "Confidential Service",
        description: "Your privacy is our priority. All services are completely anonymous.",
        icon: "🤫"
    }
];

const pricingPlans = [
    {
        name: "Bronze",
        price: "$9.99",
        features: ["1 Division Boost", "Basic Support", "5 Days Duration"],
        color: "var(--bronze)"
    },
    {
        name: "Silver",
        price: "$19.99",
        features: ["3 Division Boost", "Priority Support", "7 Days Duration", "Win Streak Bonus"],
        color: "var(--silver)",
        popular: true
    },
    {
        name: "Gold",
        price: "$39.99",
        features: ["Full Tier Boost", "24/7 Premium Support", "14 Days Duration", "Win Streak Bonus", "Duo Queue Option"],
        color: "var(--gold)"
    }
];

export default function Home() {
    const [activePlan, setActivePlan] = useState(1);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    // Create refs for smooth scrolling
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const pricingRef = useRef(null);
    const statsRef = useRef(null);
    const ctaRef = useRef(null);

    // Scroll to top functionality and section tracking
    useEffect(() => {
        const handleScroll = () => {
            // Show/hide scroll to top button
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }

            // Track which section is currently in view
            const sections = [
                { ref: heroRef, name: 'hero' },
                { ref: featuresRef, name: 'features' },
                { ref: pricingRef, name: 'pricing' },
                { ref: statsRef, name: 'stats' },
                { ref: ctaRef, name: 'cta' }
            ];

            let currentSection = 'hero';

            sections.forEach(({ ref, name }) => {
                if (ref.current) {
                    const rect = ref.current.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;

                    // Check if section is in the middle of the viewport
                    if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
                        currentSection = name;
                    }
                }
            });

            setActiveSection(currentSection);

            // Update navigation dots
            const navDots = document.querySelectorAll('.nav-dot');
            const sectionNames = ['hero', 'features', 'pricing', 'stats', 'cta'];
            const currentIndex = sectionNames.indexOf(currentSection);

            navDots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger once on mount to set initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setActiveSection('hero');
    };

    // Smooth scroll functions
    const scrollToSection = (sectionName) => {
        let targetRef = null;

        switch (sectionName) {
            case 'hero':
                targetRef = heroRef;
                break;
            case 'features':
                targetRef = featuresRef;
                break;
            case 'pricing':
                targetRef = pricingRef;
                break;
            case 'stats':
                targetRef = statsRef;
                break;
            case 'cta':
                targetRef = ctaRef;
                break;
            default:
                targetRef = heroRef;
        }

        if (targetRef && targetRef.current) {
            // Get header height for offset (adjust 80px based on your header height)
            const headerOffset = 80;
            const elementPosition = targetRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            setActiveSection(sectionName);
        }
    };

    // Specific scroll functions for button clicks
    const scrollToGetStarted = () => {
        scrollToSection('cta');
    };

    const scrollToLearnMore = () => {
        scrollToSection('features');
    };

    // Handle plan selection with animation
    const handleSelectPlan = (index) => {
        setActivePlan(index);

        // Add a visual feedback animation
        const planCards = document.querySelectorAll('.pricing-card');
        if (planCards[index]) {
            planCards[index].classList.add('selected-pulse');
            setTimeout(() => {
                planCards[index].classList.remove('selected-pulse');
            }, 600);
        }
    };

    return (
        <main className="home-container">
            {/* Scroll to Top Arrow */}
            <button
                className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                ↑
            </button>

            {/* Optional: Navigation Dots */}
            <div className="page-navigation">
                <div
                    className={`nav-dot ${activeSection === 'hero' ? 'active' : ''}`}
                    data-tooltip="Home"
                    onClick={() => scrollToSection('hero')}
                />
                <div
                    className={`nav-dot ${activeSection === 'features' ? 'active' : ''}`}
                    data-tooltip="Why Choose EloRise?"
                    onClick={() => scrollToSection('features')}
                />
                <div
                    className={`nav-dot ${activeSection === 'pricing' ? 'active' : ''}`}
                    data-tooltip="Pricing Plans"
                    onClick={() => scrollToSection('pricing')}
                />
                <div
                    className={`nav-dot ${activeSection === 'stats' ? 'active' : ''}`}
                    data-tooltip="Our Stats"
                    onClick={() => scrollToSection('stats')}
                />
                <div
                    className={`nav-dot ${activeSection === 'cta' ? 'active' : ''}`}
                    data-tooltip="Get Started"
                    onClick={() => scrollToSection('cta')}
                />
            </div>

            {/* Optional: Scroll Progress Bar */}
            <div className="scroll-progress" id="scrollProgress"></div>

            {/* Hero Section - Add ref here */}
            <section className="hero-section" ref={heroRef}>
                <video
                    src={heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-video"
                />
                <div className="hero-content">
                    <h1 className="hero-title">Reach Your Desired Rank</h1>
                    <p className="hero-subtitle">
                        Professional League of Legends boosting service. Fast, safe, and guaranteed results.
                    </p>
                    <div className="hero-buttons">
                        <button
                            className="btn-primary"
                            onClick={scrollToGetStarted}
                        >
                            Get Started
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={scrollToLearnMore}
                        >
                            Learn More
                        </button>
                    </div>
                    <div className="scroll-indicator">
                        <div className="mouse">
                            <div className="wheel"></div>
                        </div>
                        <div className="arrow-down"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                className={`features-section ${activeSection === 'features' ? 'active' : ''}`}
                ref={featuresRef}
                id="features"
            >
                <h2 className="section-title">Why Choose EloRise?</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section
                className={`pricing-section ${activeSection === 'pricing' ? 'active' : ''}`}
                ref={pricingRef}
                id="pricing"
            >
                <h2 className="section-title">Choose Your Plan</h2>
                <div className="pricing-grid">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`pricing-card ${plan.popular ? 'popular' : ''} ${activePlan === index ? 'selected' : ''}`}
                            style={{ borderTopColor: plan.color }}
                            onClick={() => handleSelectPlan(index)}
                        >
                            {plan.popular && <div className="popular-badge">Most Popular</div>}
                            <h3>{plan.name}</h3>
                            <div className="price">{plan.price}</div>
                            <ul className="plan-features">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                            <button
                                className="btn-buy"
                                style={{ backgroundColor: plan.color }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectPlan(index);
                                }}
                            >
                                {activePlan === index ? 'Selected!' : 'Select Plan'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section
                className={`stats-section ${activeSection === 'stats' ? 'active' : ''}`}
                ref={statsRef}
                id="stats"
            >
                <h2 className="section-title">Our Achievements</h2>
                <div className="stats-grid">
                    <div className="stat-box">
                        <div className="stat-icon">📈</div>
                        <div className="stat-number">10,000+</div>
                        <div className="stat-label">ACCOUNTS BOOSTED</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-icon">✅</div>
                        <div className="stat-number">99.8%</div>
                        <div className="stat-label">SUCCESS RATE</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-icon">⏰</div>
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">SUPPORT AVAILABLE</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-icon">👑</div>
                        <div className="stat-number">50+</div>
                        <div className="stat-label">PRO BOOSTERS</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className={`cta-section ${activeSection === 'cta' ? 'active' : ''}`}
                ref={ctaRef}
                id="cta"
            >
                <div className="card">
                    <h2>Ready to Climb?</h2>
                    <p>Join thousands of satisfied players who reached their dream rank with EloRise.</p>

                    <button>

                        <Link to="/get-started/division" className="cta-button">
                            Start Your Journey
                        </Link>

                    </button>
                </div>
            </section>
        </main>
    );
}