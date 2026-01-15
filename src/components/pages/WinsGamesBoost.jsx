import { useState, useEffect } from 'react';
import './WinsGamesBoost.css';

const ranks = [
    { id: 1, name: 'Iron', color: '#51484A', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 2, name: 'Bronze', color: '#A97142', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 3, name: 'Silver', color: '#B4B4B4', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 4, name: 'Gold', color: '#FFD700', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 5, name: 'Platinum', color: '#4FD1B7', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 6, name: 'Emerald', color: '#2ECC71', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 7, name: 'Diamond', color: '#6CB2EB', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 8, name: 'Master+', color: '#9F7AEA', divisions: ['0 - 200', ' 201 - 400', '401-600', '601-800', '801-1000', '1001+'] },
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

const lpPerWinOptions = [
    '(18 - 22 LP)',
    '(24 - 27 LP)',
    '(28+ LP)'
];

function WinsGamesBoost() {
    const [currentRank, setCurrentRank] = useState({
        tier: 'Platinum',
        division: 'IV',
        lpRange: '0-20 LP',
        lpPerWin: '(24 - 27 LP)',
        currentLPRange: '0-100'

    });

    const [server, setServer] = useState('North America');
    const [queueType, setQueueType] = useState('solo');
    const [winsConfig, setWinsConfig] = useState({ numberOfWins: 3 });

    // Base price per win (for Platinum tier)
    const basePricePerWin = 4.95;
    const [priceDetails, setPriceDetails] = useState({
        basePrice: 14.85,
        discount: 0.00,
        finalPrice: 14.85
    });

    // Tier multipliers for pricing
    const tierMultipliers = {
        'Iron': 0.7,
        'Bronze': 0.8,
        'Silver': 0.9,
        'Gold': 1.0,
        'Platinum': 1.2,
        'Emerald': 1.4,
        'Diamond': 1.6,
        'Master': 2.0
    };

    // Calculate price whenever relevant state changes
    useEffect(() => {
        calculatePrice();
    }, [currentRank, winsConfig.numberOfWins, queueType]);

    const calculatePrice = () => {
        // Base calculation
        const tierMultiplier = tierMultipliers[currentRank.tier] || 1.0;
        let basePrice = basePricePerWin * winsConfig.numberOfWins * tierMultiplier;

        // Apply queue type multiplier (10% increase for duo)
        if (queueType === 'duo') {
            basePrice *= 1.1;
        }

        // Apply discounts for bulk purchases
        let discount = 0;
        if (winsConfig.numberOfWins >= 5) {
            discount = basePrice * 0.15; // 15% discount for 5 wins
        } else if (winsConfig.numberOfWins >= 3) {
            discount = basePrice * 0.10; // 10% discount for 3+ wins
        }

        const finalPrice = basePrice - discount;

        setPriceDetails({
            basePrice: parseFloat(basePrice.toFixed(2)),
            discount: parseFloat(discount.toFixed(2)),
            finalPrice: parseFloat(finalPrice.toFixed(2))
        });
    };

    const handleRankSelect = (field, value) => {
        const newRank = { ...currentRank, [field]: value };

        // If selecting Master or higher, reset division
        if (field === 'tier' && (value === 'Master' || value === 'Grandmaster' || value === 'Challenger')) {
            newRank.division = '';
        }

        setCurrentRank(newRank);
    };

    const handleWinsChange = (value) => {
        setWinsConfig({ numberOfWins: Math.min(5, Math.max(1, value)) });
    };

    const incrementWins = () => {
        if (winsConfig.numberOfWins < 5) {
            handleWinsChange(winsConfig.numberOfWins + 1);
        }
    };

    const decrementWins = () => {
        if (winsConfig.numberOfWins > 1) {
            handleWinsChange(winsConfig.numberOfWins - 1);
        }
    };

    const boostTypes = [
        { id: 'division', name: 'Division Boost', desc: 'Climb divisions fast with pro boosters', icon: '🏆', path: '/get-started/division' },
        { id: 'wins-games', name: 'Wins/Games Boost', desc: 'Win more games with expert help', icon: '⚔️', path: '/get-started/wins-games' },
        { id: 'placements', name: 'Placements', desc: 'Crush your placements for a higher start', icon: '🎯', path: '/get-started/placements' },
    ];

    return (
        <div className="wins-games-boost-page">
            <div className="wins-boost-container">
                {/* Left Panel - Configuration */}
                <div className="config-panel">
                    {/* Navigation between boost types */}
                    <div className="boost-type-nav">
                        <a href="/get-started/division" className="boost-nav-link">
                            <div className="nav-card">
                                <div className="nav-indicator"></div>
                                <div className="nav-icon">🏆</div>
                                <div className="nav-content">
                                    <h3>Division Boost</h3>
                                    <p>Rank up through divisions and tiers</p>
                                </div>
                            </div>
                        </a>

                        <a href="/get-started/wins-games" className="boost-nav-link active">
                            <div className="nav-card active">
                                <div className="nav-indicator"></div>
                                <div className="nav-icon">⚔️</div>
                                <div className="nav-content">
                                    <h3>Wins/Games Boost</h3>
                                    <p>Win more games with expert help</p>
                                </div>
                            </div>
                        </a>

                        <a href="/get-started/placements" className="boost-nav-link">
                            <div className="nav-card">
                                <div className="nav-indicator"></div>
                                <div className="nav-icon">🎯</div>
                                <div className="nav-content">
                                    <h3>Placements</h3>
                                    <p>Complete your placement matches</p>
                                </div>
                            </div>
                        </a>
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
                                            onClick={() => handleRankSelect('tier', rank.name)}
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
                                        <h3>{currentRank.tier === 'Master+' ? 'CURRENT LP RANGE' : 'Division'}</h3>
                                        <div className="division-grid">
                                            {ranks.find(r => r.name === currentRank.tier)?.divisions.map(div => (
                                                <button
                                                    key={div}
                                                    className={`division-btn ${currentRank.division === div ? 'active' : ''}`}
                                                    onClick={() => handleRankSelect('division', div)}
                                                >
                                                    {div}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* AVG. LP PER WIN Section (only for Master+) */}
                                {currentRank.tier === 'Master+' && (
                                    <div className="lp-per-win-section">
                                        <h3>AVG. LP PER WIN</h3>
                                        <div className="lp-per-win-options">
                                            {['(18 - 22 LP)', '(24 - 27 LP)', '(28+ LP)'].map(lp => (
                                                <button
                                                    key={lp}
                                                    className={`lp-per-win-btn ${currentRank.lpPerWin === lp ? 'active' : ''}`}
                                                    onClick={() => handleRankSelect('lpPerWin', lp)}
                                                >
                                                    {lp}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Current LP Range (for Master and below) */}
                                {currentRank.tier !== 'Master+' && (
                                    <div className="lp-range-section">
                                        <h3>CURRENT LP RANGE</h3>
                                        <div className="lp-range-options">
                                            {['0-20 LP', '21-40 LP', '41-60 LP', '61-80 LP', '81-99 LP', '100+ LP (Promos)'].map(lp => (
                                                <button
                                                    key={lp}
                                                    className={`lp-range-btn ${currentRank.currentLPRange === lp ? 'active' : ''}`}
                                                    onClick={() => handleRankSelect('lpRange', lp)}
                                                >
                                                    {lp}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Avg LP Per Win (for Master and below) */}
                                {currentRank.tier !== 'Master+' && (
                                    <div className="lp-per-win-section">
                                        <h3>AVG. LP PER WIN</h3>
                                        <div className="lp-per-win-options">
                                            {lpPerWinOptions.map(lp => (
                                                <button
                                                    key={lp}
                                                    className={`lp-per-win-btn ${currentRank.lpPerWin === lp ? 'active' : ''}`}
                                                    onClick={() => handleRankSelect('lpPerWin', lp)}
                                                >
                                                    {lp}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Server Selection Card */}
                            <div className="config-card">
                                <div className="card-header">
                                    <div className="card-icon">🌐</div>
                                    <div className="card-title">
                                        <h2>Server Selection</h2>
                                        <p>Choose your game server</p>
                                    </div>
                                </div>
                                <div className="server-selector">
                                    <div className="custom-select">
                                        <select
                                            value={server}
                                            onChange={(e) => setServer(e.target.value)}
                                            className="modern-select"
                                        >
                                            {servers.map(srv => (
                                                <option key={srv} value={srv}>{srv}</option>
                                            ))}
                                        </select>
                                        <div className="select-arrow">▼</div>
                                    </div>
                                    <p className="server-note">Your server determines booster availability and ping</p>
                                </div>
                            </div>

                            {/* Number of Wins Section */}
                            <div className="wins-number-section">
                                <div className="wins-header">
                                    <h3>Number of Wins</h3>
                                    <div className="wins-display">
                                        <button
                                            className="wins-btn decrement"
                                            onClick={decrementWins}
                                            disabled={winsConfig.numberOfWins <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="wins-number-large">{winsConfig.numberOfWins}</span>
                                        <button
                                            className="wins-btn increment"
                                            onClick={incrementWins}
                                            disabled={winsConfig.numberOfWins >= 5}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Wins Slider */}
                                <div className="wins-slider-container">
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        step="1"
                                        value={winsConfig.numberOfWins}
                                        onChange={(e) => handleWinsChange(parseInt(e.target.value))}
                                        className="wins-slider-input"
                                    />
                                    <div className="slider-labels">
                                        <span>1</span>
                                        <span>2</span>
                                        <span>3</span>
                                        <span>4</span>
                                        <span>5</span>
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

                            {/* Current Rank - Show only tier name for Master+ */}
                            <div className="detail-item">
                                <span className="detail-label">Current Rank:</span>
                                <span className="detail-value">
                                    {currentRank.tier === 'Master+'
                                        ? 'Master+'  // Just show "Master+" without LP range
                                        : `${currentRank.tier} ${currentRank.division}`}
                                </span>
                            </div>

                            {/* Show LP Range for Master+, Current LP for others */}
                            {currentRank.tier === 'Master+' ? (
                                // Master+ details
                                <div className="detail-item">
                                    <span className="detail-label">LP Range:</span>
                                    <span className="detail-value">{currentRank.division} LP</span>
                                </div>
                            ) : (
                                // Non-Master+ details
                                <div className="detail-item">
                                    <span className="detail-label">Current LP:</span>
                                    <span className="detail-value">{currentRank.lpRange}</span>
                                </div>
                            )}

                            {/* Avg LP per Win for ALL tiers */}
                            <div className="detail-item">
                                <span className="detail-label">Avg LP per Win:</span>
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
                        {priceDetails.discount > 0 && (
                            <div className="savings-banner">
                                <div className="savings-content">
                                    <div className="savings-text">
                                        <span className="savings-message">YOU SAVED ${priceDetails.discount.toFixed(2)} ON YOUR ORDER!</span>
                                        <span className="upsell-message">ADD MORE WINS AND SAVE MORE</span>
                                    </div>
                                    <div className="loyalty-points">+{winsConfig.numberOfWins * 10} Loyalty Points</div>
                                </div>
                            </div>
                        )}

                        {/* Price Summary */}
                        <div className="price-summary">
                            <div className="price-row">
                                <span className="price-label">Base Price:</span>
                                <span className="price-value">${priceDetails.basePrice.toFixed(2)}</span>
                            </div>
                            {priceDetails.discount > 0 && (
                                <div className="price-row">
                                    <span className="price-label">Discount:</span>
                                    <span className="price-value discount">-${priceDetails.discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="price-row total">
                                <span className="price-label">Total Price:</span>
                                <div className="total-price">
                                    <span className="old-price">${priceDetails.basePrice.toFixed(2)}</span>
                                    <span className="final-price">${priceDetails.finalPrice.toFixed(2)}</span>
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
        </div >
    );
}

export default WinsGamesBoost;