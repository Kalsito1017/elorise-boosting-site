import { useState } from 'react';
import './GetStarted.css';

// Reuse the same data
const ranks = [
    { id: 1, name: 'Iron', color: '#51484A', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 2, name: 'Bronze', color: '#A97142', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 3, name: 'Silver', color: '#B4B4B4', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 4, name: 'Gold', color: '#FFD700', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 5, name: 'Platinum', color: '#4FD1B7', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 6, name: 'Emerald', color: '#2ECC71', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 7, name: 'Diamond', color: '#6CB2EB', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 8, name: 'Master', color: '#9F7AEA', divisions: [] },
];

const lpRanges = [
    '0-20 LP',
    '21-40 LP',
    '41-60 LP',
    '61-80 LP',
    '81-99 LP',
    '100+ LP (Promos)'
];

const servers = [
    'North America',
    'Europe West',
    'Europe Nordic & East',
    'Korea',
    'Japan',
    'Brazil',
    'Turkey'
];

function WinsGamesBoost() {
    const [currentRank, setCurrentRank] = useState({
        tier: 'Platinum',
        division: 'IV',
        lp: '0-20 LP',
        lpPerWin: 'Normal (23+ LP)'
    });

    const [server, setServer] = useState('North America');
    const [queueType, setQueueType] = useState('solo');
    const [winsConfig, setWinsConfig] = useState({ numberOfWins: 4 });

    const handleRankSelect = (type, field, value) => {
        setCurrentRank({ ...currentRank, [field]: value });
    };

    const handleWinsChange = (value) => {
        setWinsConfig({ numberOfWins: value });
    };

    // Price calculation for wins
    const basePrice = 19.80;
    const discount = 4.20;
    const finalPrice = basePrice - discount;

    return (
        <div className="get-started-page">
            {/* Hero Section */}
            <div className="get-started-hero">
                <h1>WINS/GAMES BOOST</h1>
                <p>Win more games with expert help from our professional boosters</p>
            </div>

            <div className="get-started-container">
                {/* Left Panel - Configuration */}
                <div className="config-panel">
                    {/* Navigation between boost types */}
                    <div className="boost-type-nav">
                        <a href="/get-started/division" className="boost-nav-link">Division Boost</a>
                        <a href="/get-started/wins-games" className="boost-nav-link active">Wins/Games Boost</a>
                        <a href="/get-started/placements" className="boost-nav-link">Placements</a>
                    </div>

                    {/* Wins Boost Configuration */}
                    <div className="wins-config-section">
                        <div className="wins-rank-selector">
                            {/* Section Header */}
                            <div className="section-header">
                                <h2>Current Rank</h2>
                                <p className="section-subtitle">Select your current tier and division.</p>
                            </div>

                            {/* Rank Selection Area */}
                            <div className="wins-rank-selection">
                                {/* Tier Selection Grid */}
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
                                        <h3>Division</h3>
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
                            </div>

                            {/* Server Selection */}
                            <div className="server-section">
                                <h3>SERVER</h3>
                                <select
                                    className="server-select-full"
                                    value={server}
                                    onChange={(e) => setServer(e.target.value)}
                                >
                                    {servers.map(srv => (
                                        <option key={srv} value={srv}>{srv}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Divider Line */}
                            <div className="section-divider"></div>

                            {/* Number of Wins Section */}
                            <div className="wins-number-section">
                                <div className="wins-header">
                                    <h3>Number of Wins</h3>
                                    <div className="wins-display">
                                        <span className="wins-number-large">{winsConfig.numberOfWins}</span>
                                    </div>
                                </div>

                                {/* Wins Slider */}
                                <div className="wins-slider-container">
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        value={winsConfig.numberOfWins}
                                        onChange={(e) => handleWinsChange(parseInt(e.target.value))}
                                        className="wins-slider-input"
                                    />
                                    <div className="slider-labels">
                                        <span>1</span>
                                        <span>5</span>
                                        <span>10</span>
                                        <span>15</span>
                                        <span>20</span>
                                    </div>
                                </div>
                            </div>

                            {/* Divider Line */}
                            <div className="section-divider"></div>

                            {/* FAQ Section */}
                            <div className="wins-faq-section">
                                <h3 className="faq-question">What happens if a game is lost during my win boost?</h3>
                                <p className="faq-answer">
                                    Don't worry! Our professional boosters will play additional games to ensure you get your
                                    ordered wins. All losses are covered by our service at no extra cost.
                                </p>
                            </div>

                            {/* Season Banner */}
                            <div className="season-banner">
                                <div className="season-content">
                                    <div className="season-icon">🏆</div>
                                    <div className="season-text">
                                        <h4>Season 15 is in progress.</h4>
                                        <p>Get your boost today and take advantage of our premium services!</p>
                                    </div>
                                </div>
                            </div>
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
                    </div>
                </div>

                {/* Right Panel - Summary */}
                <div className="summary-panel">
                    <div className="order-summary">
                        <h2>ORDER SUMMARY</h2>

                        {/* Order Info */}
                        <div className="boost-order-info">
                            <div className="wins-summary">
                                <div className="current-rank-display">
                                    <span className="label">CURRENT RANK:</span>
                                    <span className="rank-value">{currentRank.tier} {currentRank.division}</span>
                                </div>
                                <div className="wins-count-display">
                                    <span className="label">WINS ORDERED:</span>
                                    <span className="rank-value">{winsConfig.numberOfWins} Wins</span>
                                </div>
                            </div>
                        </div>

                        {/* Boost Details */}
                        <div className="boost-details">
                            <div className="detail-item">
                                <span className="detail-label">Boost Type:</span>
                                <span className="detail-value">Wins/Games Boost</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Number of Wins:</span>
                                <span className="detail-value">{winsConfig.numberOfWins} Wins</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Server:</span>
                                <span className="detail-value">{server}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Queue:</span>
                                <span className="detail-value">{queueType.toUpperCase()}</span>
                            </div>
                        </div>

                        {/* Savings Banner */}
                        <div className="savings-banner">
                            <div className="savings-content">
                                <div className="savings-text">
                                    <span className="savings-message">YOU SAVED ${discount.toFixed(2)} ON YOUR ORDER!</span>
                                    <span className="upsell-message">ADD MORE WINS AND SAVE MORE</span>
                                </div>
                                <div className="loyalty-points">+65 Loyalty Points</div>
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

                        {/* Checkout Actions */}
                        <div className="checkout-actions">
                            <button className="checkout-btn primary">
                                CHECKOUT →
                            </button>
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

export default WinsGamesBoost;