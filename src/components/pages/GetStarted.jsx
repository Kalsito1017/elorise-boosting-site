import { useState } from 'react';
import './GetStarted.css';

// Rank data with tier names, colors, and image paths
const ranks = [
    { id: 1, name: 'Iron', color: '#51484A', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 2, name: 'Bronze', color: '#A97142', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 3, name: 'Silver', color: '#B4B4B4', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 4, name: 'Gold', color: '#FFD700', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 5, name: 'Platinum', color: '#4FD1B7', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 6, name: 'Emerald', color: '#2ECC71', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 7, name: 'Diamond', color: '#6CB2EB', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 8, name: 'Master', color: '#9F7AEA', divisions: [] },
    { id: 9, name: 'Grandmaster', color: '#E53E3E', divisions: [] },
    { id: 10, name: 'Challenger', color: '#F6E05E', divisions: [] },
];

// LP ranges for the dropdown
const lpRanges = [
    '0-20 LP',
    '21-40 LP',
    '41-60 LP',
    '61-80 LP',
    '81-99 LP',
    '100+ LP (Promos)'
];

// Boost types
const boostTypes = [
    { id: 'division', name: 'Division Boost', desc: 'Climb divisions fast with pro boosters', icon: '🏆' },
    { id: 'wins', name: 'Wins/Games Boost', desc: 'Win more games with expert help', icon: '⚔️' },
    { id: 'placement', name: 'Placements', desc: 'Crush your placements for a higher start', icon: '🎯' },
];

// Additional features
const extraFeatures = [
    { id: 'priority', name: 'Priority Order', desc: 'Faster completion time', price: '+25%' },
    { id: 'solo', name: 'Solo Only', desc: 'Booster plays solo only', price: '+30%' },
    { id: 'onetrick', name: 'One Trick Pony', desc: 'Booster uses one champion', price: '+30%' },
    { id: 'stream', name: 'Live Stream', desc: 'Watch your games live', price: '+15%' },
];

function GetStarted() {
    // State for current rank selection
    const [currentRank, setCurrentRank] = useState({
        tier: 'Gold',
        division: 'IV',
        lp: '0-20 LP',
        lpPerWin: 'Normal (23+ LP)'
    });

    // State for desired rank selection
    const [desiredRank, setDesiredRank] = useState({
        tier: 'Platinum',
        division: 'IV',
        lp: '0 LP'
    });

    // State for selected boost type
    const [selectedBoost, setSelectedBoost] = useState('division');

    // State for extra features
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    // State for server selection
    const [server, setServer] = useState('North America');

    // State for duo/solo selection
    const [queueType, setQueueType] = useState('solo');

    // Base price calculation (simplified)
    const basePrice = 24.80;
    const discount = 6.20;
    const finalPrice = basePrice - discount;

    // Handle feature selection
    const toggleFeature = (featureId) => {
        if (selectedFeatures.includes(featureId)) {
            setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
        } else {
            setSelectedFeatures([...selectedFeatures, featureId]);
        }
    };

    // Handle rank selection
    const handleRankSelect = (type, field, value) => {
        if (type === 'current') {
            setCurrentRank({ ...currentRank, [field]: value });
        } else {
            setDesiredRank({ ...desiredRank, [field]: value });
        }
    };

    return (
        <div className="get-started-page">
            {/* Hero Section */}
            <div className="get-started-hero">
                <h1>GET STARTED WITH YOUR BOOST</h1>
                <p>Choose your current rank, desired rank, and customize your boosting experience</p>
            </div>

            <div className="get-started-container">
                {/* Left Panel - Configuration */}
                <div className="config-panel">
                    {/* Boost Type Selection */}
                    <div className="boost-types-section">
                        <h2>SELECT BOOST TYPE</h2>
                        <div className="boost-types-grid">
                            {boostTypes.map(boost => (
                                <div
                                    key={boost.id}
                                    className={`boost-type-card ${selectedBoost === boost.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedBoost(boost.id)}
                                >
                                    <div className="boost-icon">{boost.icon}</div>
                                    <h3>{boost.name}</h3>
                                    <p>{boost.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rank Selection */}
                    <div className="rank-selection-section">
                        {/* Current Rank */}
                        <div className="rank-selector">
                            <div className="section-header">
                                <h3>Current Rank</h3>
                                <p>Select your current tier and division</p>
                            </div>

                            {/* Tier Selection */}
                            <div className="tier-grid">
                                {ranks.map(rank => (
                                    <div
                                        key={rank.id}
                                        className={`tier-option ${currentRank.tier === rank.name ? 'selected' : ''}`}
                                        onClick={() => handleRankSelect('current', 'tier', rank.name)}
                                        style={{ borderColor: currentRank.tier === rank.name ? rank.color : 'transparent' }}
                                    >
                                        <div className="tier-icon" style={{ backgroundColor: rank.color }}>
                                            {rank.name.charAt(0)}
                                        </div>
                                        <span>{rank.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Division Selection */}
                            {currentRank.tier && ranks.find(r => r.name === currentRank.tier)?.divisions.length > 0 && (
                                <div className="division-section">
                                    <h4>Division</h4>
                                    <div className="division-grid">
                                        {ranks.find(r => r.name === currentRank.tier)?.divisions.map(div => (
                                            <button
                                                key={div}
                                                className={`division-btn ${currentRank.division === div ? 'active' : ''}`}
                                                onClick={() => handleRankSelect('current', 'division', div)}
                                            >
                                                {div}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* LP Selection */}
                            <div className="lp-section">
                                <h4>Current LP</h4>
                                <select
                                    className="lp-select"
                                    value={currentRank.lp}
                                    onChange={(e) => handleRankSelect('current', 'lp', e.target.value)}
                                >
                                    {lpRanges.map(lp => (
                                        <option key={lp} value={lp}>{lp}</option>
                                    ))}
                                </select>

                                <div className="lp-info">
                                    <div className="lp-info-item">
                                        <span className="label">AVG. LP PER WIN:</span>
                                        <span className="value">{currentRank.lpPerWin}</span>
                                    </div>
                                    <div className="lp-info-item">
                                        <span className="label">SERVER:</span>
                                        <select
                                            className="server-select"
                                            value={server}
                                            onChange={(e) => setServer(e.target.value)}
                                        >
                                            <option>North America</option>
                                            <option>Europe West</option>
                                            <option>Europe Nordic & East</option>
                                            <option>Korea</option>
                                            <option>Japan</option>
                                            <option>Brazil</option>
                                            <option>Turkey</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desired Rank */}
                        <div className="rank-selector">
                            <div className="section-header">
                                <h3>Desired Rank</h3>
                                <p>Select your desired tier and division</p>
                            </div>

                            {/* Tier Selection */}
                            <div className="tier-grid">
                                {ranks.map(rank => (
                                    <div
                                        key={rank.id}
                                        className={`tier-option ${desiredRank.tier === rank.name ? 'selected' : ''}`}
                                        onClick={() => handleRankSelect('desired', 'tier', rank.name)}
                                        style={{ borderColor: desiredRank.tier === rank.name ? rank.color : 'transparent' }}
                                    >
                                        <div className="tier-icon" style={{ backgroundColor: rank.color }}>
                                            {rank.name.charAt(0)}
                                        </div>
                                        <span>{rank.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Division Selection */}
                            {desiredRank.tier && ranks.find(r => r.name === desiredRank.tier)?.divisions.length > 0 && (
                                <div className="division-section">
                                    <h4>Division</h4>
                                    <div className="division-grid">
                                        {ranks.find(r => r.name === desiredRank.tier)?.divisions.map(div => (
                                            <button
                                                key={div}
                                                className={`division-btn ${desiredRank.division === div ? 'active' : ''}`}
                                                onClick={() => handleRankSelect('desired', 'division', div)}
                                            >
                                                {div}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Desired LP */}
                            <div className="lp-section">
                                <h4>Desired LP</h4>
                                <select
                                    className="lp-select"
                                    value={desiredRank.lp}
                                    onChange={(e) => handleRankSelect('desired', 'lp', e.target.value)}
                                >
                                    <option>0 LP</option>
                                    <option>20 LP</option>
                                    <option>40 LP</option>
                                    <option>60 LP</option>
                                    <option>80 LP</option>
                                    <option>100 LP</option>
                                </select>
                            </div>
                        </div>

                        {/* Queue Type Selection */}
                        <div className="queue-type-section">
                            <h3>Queue Type</h3>
                            <div className="queue-type-buttons">
                                <button
                                    className={`queue-btn ${queueType === 'solo' ? 'active' : ''}`}
                                    onClick={() => setQueueType('solo')}
                                >
                                    SOLO
                                </button>
                                <button
                                    className={`queue-btn ${queueType === 'duo' ? 'active' : ''}`}
                                    onClick={() => setQueueType('duo')}
                                >
                                    DUO
                                </button>
                            </div>
                            <p className="queue-note">
                                Season 15 is in progress. Get your boost today and take advantage of our premium services!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Summary & Checkout */}
                <div className="summary-panel">
                    {/* Order Summary */}
                    <div className="order-summary">
                        <h2>ORDER SUMMARY</h2>

                        <div className="rank-display">
                            <div className="current-rank-display">
                                <span className="label">CURRENT:</span>
                                <span className="rank-value">{currentRank.tier} {currentRank.division} ({currentRank.lp})</span>
                            </div>
                            <div className="arrow">→</div>
                            <div className="desired-rank-display">
                                <span className="label">DESIRED:</span>
                                <span className="rank-value">{desiredRank.tier} {desiredRank.division} ({desiredRank.lp})</span>
                            </div>
                        </div>

                        <div className="boost-info">
                            <div className="info-item">
                                <span className="label">Boost Type:</span>
                                <span className="value">{boostTypes.find(b => b.id === selectedBoost)?.name}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Queue:</span>
                                <span className="value">{queueType.toUpperCase()}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Server:</span>
                                <span className="value">{server}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Est. Time:</span>
                                <span className="value highlight">1-2 days</span>
                            </div>
                        </div>

                        {/* Extra Features */}
                        <div className="extra-features-section">
                            <h3>ENHANCE YOUR PURCHASE</h3>
                            <div className="features-list">
                                {extraFeatures.map(feature => (
                                    <div
                                        key={feature.id}
                                        className={`feature-item ${selectedFeatures.includes(feature.id) ? 'selected' : ''}`}
                                        onClick={() => toggleFeature(feature.id)}
                                    >
                                        <div className="feature-selector">
                                            <div className={`feature-checkbox ${selectedFeatures.includes(feature.id) ? 'checked' : ''}`}>
                                                {selectedFeatures.includes(feature.id) && '✓'}
                                            </div>
                                        </div>
                                        <div className="feature-details">
                                            <div className="feature-name">{feature.name}</div>
                                            <div className="feature-desc">{feature.desc}</div>
                                        </div>
                                        <div className="feature-price">{feature.price}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Discount Code */}
                            <div className="discount-section">
                                <h4>Discount Code</h4>
                                <div className="discount-input">
                                    <input type="text" placeholder="Enter discount code" />
                                    <button className="apply-btn">APPLY</button>
                                </div>
                            </div>
                        </div>

                        {/* Loyalty Points */}
                        <div className="loyalty-banner">
                            <div className="loyalty-content">
                                <span className="loyalty-text">GO HIGHER AND SAVE $3</span>
                                <span className="loyalty-points">+65 Loyalty Points</span>
                            </div>
                        </div>

                        {/* Price Summary */}
                        <div className="price-summary">
                            <div className="price-row">
                                <span className="price-label">Base Price:</span>
                                <span className="price-value">${basePrice.toFixed(2)}</span>
                            </div>
                            <div className="price-row">
                                <span className="price-label">Discount:</span>
                                <span className="price-value discount">-${discount.toFixed(2)}</span>
                            </div>
                            <div className="price-row total">
                                <span className="price-label">Total Price:</span>
                                <div className="total-price">
                                    <span className="old-price">${basePrice.toFixed(2)}</span>
                                    <span className="final-price">${finalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Checkout Buttons */}
                        <div className="checkout-actions">
                            <button className="checkout-btn primary">
                                CHECKOUT →
                            </button>
                            <div className="express-purchase">
                                <span>or express purchase</span>
                            </div>
                            <button className="checkout-btn paypal">
                                <span className="paypal-icon">P</span>
                                Pay with PayPal
                            </button>
                        </div>

                        {/* Trust Badge */}
                        <div className="trust-badge">
                            <div className="trust-content">
                                <div className="trust-icon">✓</div>
                                <div className="trust-text">
                                    <strong>TRUSTED BY THOUSANDS OF SATISFIED CLIENTS</strong>
                                    <span>Secure checkout · 24/7 Support · Money-back guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetStarted;