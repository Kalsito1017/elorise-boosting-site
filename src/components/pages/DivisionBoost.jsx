import { useState } from 'react';
import './GetStarted.css';

// Reuse the same data from GetStarted.jsx
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

function DivisionBoost() {
    const [currentRank, setCurrentRank] = useState({
        tier: 'Gold',
        division: 'IV',
        lp: '0-20 LP',
        lpPerWin: 'Normal (23+ LP)'
    });

    const [desiredRank, setDesiredRank] = useState({
        tier: 'Platinum',
        division: 'IV',
        lp: '0 LP'
    });

    const [server, setServer] = useState('North America');
    const [queueType, setQueueType] = useState('solo');

    const handleRankSelect = (type, field, value) => {
        if (type === 'current') {
            setCurrentRank({ ...currentRank, [field]: value });
        } else {
            setDesiredRank({ ...desiredRank, [field]: value });
        }
    };

    // Price calculation
    const basePrice = 24.80;
    const discount = 6.20;
    const finalPrice = basePrice - discount;

    return (
        <div className="get-started-page">
            {/* Hero Section */}
            <div className="get-started-hero">
                <h1>DIVISION BOOST</h1>
                <p>Climb divisions fast with our professional boosters</p>
            </div>

            <div className="get-started-container">
                {/* Left Panel - Configuration */}
                <div className="config-panel">
                    {/* Navigation between boost types */}
                    <div className="boost-type-nav">
                        <a href="/get-started/division" className="boost-nav-link active">Division Boost</a>
                        <a href="/get-started/wins-games" className="boost-nav-link">Wins/Games Boost</a>
                        <a href="/get-started/placements" className="boost-nav-link">Placements</a>
                    </div>

                    {/* Current Rank */}
                    <div className="rank-selection-section">
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

                                {/* Average LP Per Win dropdown */}
                                <div className="avg-lp-section" style={{ marginTop: '1rem' }}>
                                    <h4>AVG. LP PER WIN:</h4>
                                    <select
                                        className="lp-select"
                                        value={currentRank.lpPerWin}
                                        onChange={(e) => handleRankSelect('current', 'lpPerWin', e.target.value)}
                                    >
                                        <option value="Very Low (8-15)">Very Low (8-15)</option>
                                        <option value="Low (16-22)">Low (16-22)</option>
                                        <option value="Normal (23+ LP)">Normal (23+ LP)</option>
                                    </select>
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
                                    <option>0-20 LP</option>
                                    <option>21-40 LP</option>
                                    <option>41-60 LP</option>
                                    <option>61-80 LP</option>
                                    <option>81-99 LP</option>
                                    <option>100+ LP (Promos)</option>
                                </select>
                            </div>
                        </div>

                        {/* Server Selection */}
                        <div className="server-section">
                            <h4>Server</h4>
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
                            <div className="rank-display-summary">
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
                        </div>

                        {/* Boost Details */}
                        <div className="boost-details">
                            <div className="detail-item">
                                <span className="detail-label">Boost Type:</span>
                                <span className="detail-value">Division Boost</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Avg LP Per Win:</span>
                                <span className="detail-value">{currentRank.lpPerWin}</span>
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
                                    <span className="upsell-message">GO HIGHER AND SAVE $3</span>
                                </div>
                                <div className="loyalty-points">+98 Loyalty Points</div>
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

export default DivisionBoost;