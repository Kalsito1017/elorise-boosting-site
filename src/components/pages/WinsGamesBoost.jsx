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
    {
        id: 8, name: 'Master+', color: '#9F7AEA',
        divisions: ['0-200 LP', '201-400 LP', '401-600 LP', '601-800 LP', '801-1000 LP', '1001+ LP']
    },
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
        lpRange: '0-20 LP',
        lpPerWin: '(24 - 27 LP)',
        currentLPRange: '0-20 LP'
    });

    const [server, setServer] = useState('North America');
    const [queueType, setQueueType] = useState('solo');
    const [winsConfig, setWinsConfig] = useState({ numberOfWins: 3 });

    const [priceDetails, setPriceDetails] = useState({
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        loyaltyPoints: 0
    });

    // NEW: Base prices per win based on tier and LP
    const tierBasePrices = {
        'Iron': {
            basePerWin: 3.50,
            lpMultiplier: 1.0
        },
        'Bronze': {
            basePerWin: 4.25,
            lpMultiplier: 1.0
        },
        'Silver': {
            basePerWin: 5.00,
            lpMultiplier: 1.0
        },
        'Gold': {
            basePerWin: 5.75,
            lpMultiplier: 1.0
        },
        'Platinum': {
            basePerWin: 6.50,
            lpMultiplier: 1.0
        },
        'Emerald': {
            basePerWin: 7.50,
            lpMultiplier: 1.0
        },
        'Diamond': {
            basePerWin: 8.75,
            lpMultiplier: 1.0
        },
        'Master+': {
            basePerWin: 11.00, // Base for 0-200 LP range
            lpMultiplier: {
                '0-200 LP': 1.0,      // $11 per win
                '201-400 LP': 1.8,    // ~$20 per win
                '401-600 LP': 2.7,    // ~$30 per win
                '601-800 LP': 3.6,    // ~$40 per win
                '801-1000 LP': 4.5,   // ~$50 per win
                '1001+ LP': 5.4       // ~$60 per win
            }
        }
    };

    // NEW: LP Per Win multipliers (higher LP gains = more expensive)
    const lpPerWinMultipliers = {
        '(18 - 22 LP)': 1.0,     // Standard
        '(24 - 27 LP)': 1.2,     // 20% more expensive
        '(28+ LP)': 1.4          // 40% more expensive
    };

    // NEW: Calculate price whenever relevant state changes
    useEffect(() => {
        calculatePrice();
    }, [currentRank, winsConfig.numberOfWins, queueType]);

    const calculatePrice = () => {
        const tierData = tierBasePrices[currentRank.tier];
        let basePricePerWin = tierData.basePerWin;

        // Apply LP range multiplier for Master+
        if (currentRank.tier === 'Master+') {
            const lpMultiplier = tierData.lpMultiplier[currentRank.division] || 1.0;
            basePricePerWin *= lpMultiplier;
        }

        // Apply LP per win multiplier
        const lpWinMultiplier = lpPerWinMultipliers[currentRank.lpPerWin] || 1.0;
        basePricePerWin *= lpWinMultiplier;

        // Calculate total base price
        let basePrice = basePricePerWin * winsConfig.numberOfWins;

        // Apply queue type multiplier (15% increase for duo)
        if (queueType === 'duo') {
            basePrice *= 1.15;
        }

        // Apply volume discounts
        let discountPercentage = 0;
        let discountMessage = '';

        if (winsConfig.numberOfWins >= 5) {
            discountPercentage = 0.20; // 20% discount for 5 wins
            discountMessage = '🔥 HOT DEAL: 20% OFF FOR 5 WINS!';
        } else if (winsConfig.numberOfWins >= 3) {
            discountPercentage = 0.15; // 15% discount for 3-4 wins
            discountMessage = '💰 SAVE 15% FOR 3+ WINS!';
        } else if (winsConfig.numberOfWins === 2) {
            discountPercentage = 0.05; // 5% discount for 2 wins
            discountMessage = '🎯 GET 5% OFF FOR 2 WINS!';
        }

        const discountAmount = basePrice * discountPercentage;
        const finalPrice = basePrice - discountAmount;

        // Calculate loyalty points (more for higher tiers and more wins)
        let loyaltyPoints = winsConfig.numberOfWins * 15; // Base 15 points per win

        // Bonus points for higher tiers
        const tierBonusPoints = {
            'Iron': 5,
            'Bronze': 10,
            'Silver': 15,
            'Gold': 20,
            'Platinum': 25,
            'Emerald': 30,
            'Diamond': 35,
            'Master+': 50
        };

        loyaltyPoints += tierBonusPoints[currentRank.tier] || 0;

        // Extra points for Master+ higher LP ranges
        if (currentRank.tier === 'Master+') {
            const lpRangeBonus = {
                '0-200 LP': 10,
                '201-400 LP': 20,
                '401-600 LP': 30,
                '601-800 LP': 40,
                '801-1000 LP': 50,
                '1001+ LP': 75
            };
            loyaltyPoints += lpRangeBonus[currentRank.division] || 0;
        }

        setPriceDetails({
            basePrice: parseFloat(basePrice.toFixed(2)),
            discount: parseFloat(discountAmount.toFixed(2)),
            finalPrice: parseFloat(finalPrice.toFixed(2)),
            discountPercentage: Math.round(discountPercentage * 100),
            discountMessage: discountMessage,
            loyaltyPoints: loyaltyPoints,
            pricePerWin: parseFloat(basePricePerWin.toFixed(2))
        });
    };

    const handleRankSelect = (field, value) => {
        const newRank = { ...currentRank, [field]: value };

        // If changing tier, reset some values
        if (field === 'tier') {
            if (value === 'Master+') {
                newRank.division = '0-200 LP';
                newRank.lpPerWin = '(24 - 27 LP)';
                newRank.lpRange = '';
            } else {
                newRank.division = 'IV';
                newRank.lpPerWin = '(24 - 27 LP)';
                newRank.currentLPRange = '0-20 LP';
            }
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

                            {/* Division Selection for non-Master+ */}
                            {currentRank.tier !== 'Master+' && ranks.find(r => r.name === currentRank.tier)?.divisions.length > 0 && (
                                <div className="division-section">
                                    <h3>Division</h3>
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

                            {/* Current LP Range (for Master and below) */}
                            {currentRank.tier !== 'Master+' && (
                                <div className="lp-range-section">
                                    <h3>CURRENT LP RANGE</h3>
                                    <div className="lp-range-options">
                                        {['0-20 LP', '21-40 LP', '41-60 LP', '61-80 LP', '81-99 LP', '100+ LP (Promos)'].map(lp => (
                                            <button
                                                key={lp}
                                                className={`lp-range-btn ${currentRank.currentLPRange === lp ? 'active' : ''}`}
                                                onClick={() => handleRankSelect('currentLPRange', lp)}
                                            >
                                                {lp}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* LP Range Selection for Master+ */}
                            {currentRank.tier === 'Master+' && (
                                <div className="lp-range-section">
                                    <h3>CURRENT LP RANGE</h3>
                                    <div className="lp-range-options">
                                        {ranks.find(r => r.name === 'Master+')?.divisions.map(lpRange => (
                                            <button
                                                key={lpRange}
                                                className={`lp-range-btn ${currentRank.division === lpRange ? 'active' : ''}`}
                                                onClick={() => handleRankSelect('division', lpRange)}
                                            >
                                                {lpRange}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Avg LP Per Win for ALL tiers */}
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
                                            <br />
                                            <small style={{ fontSize: '0.7em', opacity: 0.8 }}>
                                                {lp === '(18 - 22 LP)' ? 'Standard' :
                                                    lp === '(24 - 27 LP)' ? '+20% Price' :
                                                        '+40% Price'}
                                            </small>
                                        </button>
                                    ))}
                                </div>
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
                                    <div className="discount-info" style={{
                                        textAlign: 'center',
                                        fontSize: '0.85rem',
                                        color: '#7abfff',
                                        marginTop: '0.5rem',
                                        fontWeight: '600'
                                    }}>
                                        {priceDetails.discountMessage && `🎯 ${priceDetails.discountMessage}`}
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
                                <br />
                                <small style={{ fontSize: '0.7em', opacity: 0.8 }}>+15% Price</small>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Summary */}
                <div className="summary-panel">
                    <div className="order-summary">
                        <h2>ORDER SUMMARY</h2>

                        {/* Price per win indicator */}
                        {currentRank.tier === 'Master+' && (
                            <div className="info-card" style={{
                                background: 'rgba(122, 191, 255, 0.1)',
                                border: '1px solid rgba(122, 191, 255, 0.3)',
                                borderRadius: '12px',
                                padding: '1rem',
                                marginBottom: '1rem',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '0.9rem', color: '#7abfff', fontWeight: '600' }}>
                                    💰 Price per Win: <strong>${priceDetails.pricePerWin?.toFixed(2)}</strong>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                                    Based on {currentRank.division} & {currentRank.lpPerWin}
                                </div>
                            </div>
                        )}

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

                            {/* Current Rank */}
                            <div className="detail-item">
                                <span className="detail-label">Current Rank:</span>
                                <span className="detail-value">
                                    {currentRank.tier === 'Master+'
                                        ? 'Master+'
                                        : `${currentRank.tier} ${currentRank.division}`}
                                </span>
                            </div>

                            {/* Show LP Range */}
                            <div className="detail-item">
                                <span className="detail-label">
                                    {currentRank.tier === 'Master+' ? 'LP Range:' : 'Current LP:'}
                                </span>
                                <span className="detail-value">
                                    {currentRank.tier === 'Master+'
                                        ? currentRank.division
                                        : currentRank.currentLPRange}
                                </span>
                            </div>

                            {/* Avg LP per Win */}
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
                                <span className="detail-value">
                                    {queueType.toUpperCase()}
                                    {queueType === 'duo' && ' (+15%)'}
                                </span>
                            </div>
                        </div>

                        {/* Savings Banner */}
                        {priceDetails.discount > 0 && (
                            <div className="savings-banner">
                                <div className="savings-content">
                                    <div className="savings-text">
                                        <span className="savings-message">
                                            YOU SAVE ${priceDetails.discount.toFixed(2)} ({priceDetails.discountPercentage}% OFF!)
                                        </span>
                                        <span className="upsell-message">{priceDetails.discountMessage}</span>
                                    </div>
                                    <div className="loyalty-points">+{priceDetails.loyaltyPoints} Loyalty Points</div>
                                </div>
                            </div>
                        )}

                        {/* Price Summary */}
                        <div className="price-summary">
                            <div className="price-row">
                                <span className="price-label">Base Price ({winsConfig.numberOfWins} wins):</span>
                                <span className="price-value">${priceDetails.basePrice.toFixed(2)}</span>
                            </div>
                            {queueType === 'duo' && (
                                <div className="price-row">
                                    <span className="price-label">Duo Queue Surcharge:</span>
                                    <span className="price-value">+15%</span>
                                </div>
                            )}
                            {priceDetails.discount > 0 && (
                                <div className="price-row discount">
                                    <span className="price-label">Discount ({priceDetails.discountPercentage}%):</span>
                                    <span className="price-value discount">-${priceDetails.discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="price-row total">
                                <span className="price-label">Total Price:</span>
                                <div className="total-price">
                                    {priceDetails.discount > 0 && (
                                        <span className="old-price">${priceDetails.basePrice.toFixed(2)}</span>
                                    )}
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
        </div>
    );
}

export default WinsGamesBoost;