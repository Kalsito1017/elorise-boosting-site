import { useState, useEffect } from 'react';
import './PlacementsBoost.css';

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
    { id: 9, name: 'GrandMaster', color: '#ff005d', divisions: [] },
    { id: 10, name: 'Challenger', color: '#ddff00', divisions: [] },
];

const boostTypes = [
    { id: 'division', name: 'Division Boost', desc: 'Climb divisions fast with pro boosters', icon: '🏆', path: '/get-started/division' },
    { id: 'wins-games', name: 'Wins/Games Boost', desc: 'Win more games with expert help', icon: '⚔️', path: '/get-started/wins-games' },
    { id: 'placements', name: 'Placements', desc: 'Crush your placements for a higher start', icon: '🎯', path: '/get-started/placements' },
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

// Base price per game
const baseGamePrice = 9.99;

const placementOptions = [
    { value: 1, label: '1 Game', basePrice: baseGamePrice },
    { value: 2, label: '2 Games', basePrice: baseGamePrice * 2 },
    { value: 3, label: '3 Games', basePrice: baseGamePrice * 3 },
    { value: 4, label: '4 Games', basePrice: baseGamePrice * 4 },
    { value: 5, label: '5 Games', basePrice: baseGamePrice * 5 }
];

// Tier-based price multipliers (higher tier = higher price)
const getTierMultiplier = (tierName) => {
    const tierMultipliers = {
        'Iron': 1.0,
        'Bronze': 1.15,
        'Silver': 1.3,
        'Gold': 1.5,
        'Platinum': 1.8,
        'Emerald': 2.1,
        'Diamond': 2.5,
        'Master': 3.2,
        'GrandMaster': 4.0,
        'Challenger': 5.0
    };
    return tierMultipliers[tierName] || 1.0;
};

// Division-based price multipliers within each tier (higher division = higher price)
const getDivisionMultiplier = (division) => {
    const divisionMultipliers = {
        'IV': 1.0,    // Cheapest
        'III': 1.05,  // +5%
        'II': 1.1,    // +10%
        'I': 1.15     // Most expensive (+15%)
    };
    return divisionMultipliers[division] || 1.0;
};

// Get total rank multiplier (tier × division)
const getRankMultiplier = (tierName, division) => {
    const tierMultiplier = getTierMultiplier(tierName);
    const divisionMultiplier = getDivisionMultiplier(division);
    return tierMultiplier * divisionMultiplier;
};

// Get loyalty points based on rank (tier + division)
const getLoyaltyPointsForRank = (tierName, division, numberOfGames) => {
    // Base points per tier
    const tierPoints = {
        'Iron': 5,
        'Bronze': 8,
        'Silver': 12,
        'Gold': 15,
        'Platinum': 20,
        'Emerald': 25,
        'Diamond': 30,
        'Master': 40,
        'GrandMaster': 50,
        'Challenger': 65
    };

    // Division bonus points (higher division = more points)
    const divisionBonus = {
        'IV': 0,
        'III': 1,
        'II': 2,
        'I': 3
    };

    const basePoints = tierPoints[tierName] || 5;
    const divisionPoints = divisionBonus[division] || 0;
    const pointsPerGame = basePoints + divisionPoints;

    // Multiply by number of games
    return pointsPerGame * numberOfGames;
};

function PlacementsBoost() {
    const [lastSeasonRank, setLastSeasonRank] = useState({
        tier: 'Gold',
        division: 'IV'
    });

    const [server, setServer] = useState('North America');
    const [queueType, setQueueType] = useState('solo');
    const [selectedPlacements, setSelectedPlacements] = useState(5);
    const [hasPreviousRank, setHasPreviousRank] = useState(true);
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [rankMultiplier, setRankMultiplier] = useState(1.0);

    useEffect(() => {
        // Update loyalty points and rank multiplier when rank or number of games changes
        if (hasPreviousRank) {
            const points = getLoyaltyPointsForRank(lastSeasonRank.tier, lastSeasonRank.division, selectedPlacements);
            const multiplier = getRankMultiplier(lastSeasonRank.tier, lastSeasonRank.division);
            setLoyaltyPoints(points);
            setRankMultiplier(multiplier);
        } else {
            // Default for first-time players
            setLoyaltyPoints(5 * selectedPlacements);
            setRankMultiplier(1.0);
        }
    }, [lastSeasonRank.tier, lastSeasonRank.division, selectedPlacements, hasPreviousRank]);

    const handleRankSelect = (field, value) => {
        const newRank = { ...lastSeasonRank, [field]: value };
        setLastSeasonRank(newRank);
    };

    // Price calculation function with tier + division based pricing
    const calculatePricing = () => {
        // Get base price for selected number of games
        const baseGameTotal = placementOptions.find(opt => opt.value === selectedPlacements)?.basePrice || (baseGamePrice * 5);

        // Apply rank multiplier (tier × division)
        const basePriceBeforeDiscount = baseGameTotal * rankMultiplier;

        // Calculate discount based on number of games
        let discount = 0;
        if (selectedPlacements === 5) discount = 5.00;
        else if (selectedPlacements === 4) discount = 3.00;
        else if (selectedPlacements === 3) discount = 2.00;
        else if (selectedPlacements === 2) discount = 1.00;
        else if (selectedPlacements === 1) discount = 0.50;

        // Apply rank multiplier to discount
        discount = discount * rankMultiplier;

        // Duo queue adds 10% to price
        const duoMultiplier = queueType === 'duo' ? 1.10 : 1.00;

        const finalBasePrice = basePriceBeforeDiscount * duoMultiplier;
        const finalDiscount = discount * duoMultiplier;
        const finalPrice = finalBasePrice - finalDiscount;
        const savingsPercent = Math.round((finalDiscount / finalBasePrice) * 100);

        // Get individual multipliers for display
        const tierMultiplier = getTierMultiplier(lastSeasonRank.tier);
        const divisionMultiplier = getDivisionMultiplier(lastSeasonRank.division);

        return {
            basePrice: finalBasePrice,
            discount: finalDiscount,
            finalPrice: finalPrice,
            savingsPercent: savingsPercent,
            isDuo: queueType === 'duo',
            duoMultiplier: duoMultiplier,
            originalBasePrice: basePriceBeforeDiscount,
            originalDiscount: discount,
            rankMultiplier: rankMultiplier.toFixed(2),
            tierMultiplier: tierMultiplier.toFixed(2),
            divisionMultiplier: divisionMultiplier.toFixed(2)
        };
    };

    const prices = calculatePricing();

    // Get rank display text with multiplier info
    const getRankDisplayText = () => {
        if (!hasPreviousRank) return 'First Time';

        const hasDivisions = !['Master', 'GrandMaster', 'Challenger'].includes(lastSeasonRank.tier);
        if (hasDivisions) {
            return `${lastSeasonRank.tier} ${lastSeasonRank.division}`;
        }
        return lastSeasonRank.tier;
    };

    return (
        <div className="placements-page">
            <div className="placements-container">
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

                    <a href="/get-started/wins-games" className="boost-nav-link">
                        <div className="nav-card">
                            <div className="nav-indicator"></div>
                            <div className="nav-icon">⚔️</div>
                            <div className="nav-content">
                                <h3>Wins/Games Boost</h3>
                                <p>Win more games with expert help</p>
                            </div>
                        </div>
                    </a>

                    <a href="/get-started/placements" className="boost-nav-link active">
                        <div className="nav-card active">
                            <div className="nav-indicator"></div>
                            <div className="nav-icon">🎯</div>
                            <div className="nav-content">
                                <h3>Placements</h3>
                                <p>Complete your placement matches</p>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="placements-layout">
                    {/* Left Panel - Configuration */}
                    <div className="config-section">
                        {/* Rank Selection Card */}
                        <div className="config-card">
                            <div className="card-header">
                                <div className="card-icon">🎮</div>
                                <div className="card-title">
                                    <h2>Previous Season Rank</h2>
                                    <p>Tell us your last season performance</p>
                                </div>
                            </div>

                            {/* Rank Toggle */}
                            <div className="rank-toggle">
                                <button
                                    className={`toggle-option ${hasPreviousRank ? 'active' : ''}`}
                                    onClick={() => setHasPreviousRank(true)}
                                >
                                    <span className="toggle-icon">📊</span>
                                    <span>I had a rank last season</span>
                                </button>
                                <button
                                    className={`toggle-option ${!hasPreviousRank ? 'active' : ''}`}
                                    onClick={() => setHasPreviousRank(false)}
                                >
                                    <span className="toggle-icon">✨</span>
                                    <span>First time / No previous rank</span>
                                </button>
                            </div>

                            {/* Rank Selection */}
                            {hasPreviousRank && (
                                <div className="rank-selection">
                                    <h3 className="selection-title">Select Your Rank</h3>
                                    <div className="rank-tiers">
                                        {ranks.map(rank => {
                                            const tierMultiplier = getTierMultiplier(rank.name);
                                            return (
                                                <div
                                                    key={rank.id}
                                                    className={`tier-pill ${lastSeasonRank.tier === rank.name ? 'selected' : ''}`}
                                                    onClick={() => handleRankSelect('tier', rank.name)}
                                                    style={{
                                                        background: lastSeasonRank.tier === rank.name ? rank.color : 'rgba(255, 255, 255, 0.05)',
                                                        borderColor: rank.color
                                                    }}
                                                >
                                                    <div className="tier-icon" style={{ backgroundColor: rank.color }}>
                                                        {rank.name.charAt(0)}
                                                    </div>
                                                    <span>{rank.name}</span>

                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Division Selection - Only show for ranks that have divisions */}
                                    {lastSeasonRank.tier &&
                                        ranks.find(r => r.name === lastSeasonRank.tier)?.divisions.length > 0 &&
                                        !['Master', 'GrandMaster', 'Challenger'].includes(lastSeasonRank.tier) && (
                                            <div className="division-selection">
                                                <h4>Division</h4>
                                                <div className="division-buttons">
                                                    {ranks.find(r => r.name === lastSeasonRank.tier)?.divisions.map(div => {
                                                        const divisionMultiplier = getDivisionMultiplier(div);
                                                        const totalMultiplier = getRankMultiplier(lastSeasonRank.tier, div);
                                                        return (
                                                            <button
                                                                key={div}
                                                                className={`division-pill ${lastSeasonRank.division === div ? 'active' : ''}`}
                                                                onClick={() => handleRankSelect('division', div)}

                                                            >
                                                                {div}

                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                            </div>
                                        )}


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

                        {/* Games Selection Card */}
                        <div className="config-card">
                            <div className="card-header">
                                <div className="card-icon">🎯</div>
                                <div className="card-title">
                                    <h2>Placement Games</h2>
                                    <p>Select how many games you need</p>
                                </div>
                            </div>

                            <div className="games-display">
                                <div className="games-counter">
                                    <span className="counter-number">{selectedPlacements}</span>
                                    <span className="counter-label">Games</span>
                                </div>

                            </div>

                            <div className="games-slider">
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    value={selectedPlacements}
                                    onChange={(e) => setSelectedPlacements(parseInt(e.target.value))}
                                    className="modern-slider"
                                />
                                <div className="slider-marks">
                                    <span>1</span>
                                    <span>2</span>
                                    <span>3</span>
                                    <span>4</span>
                                    <span>5</span>
                                </div>
                            </div>
                        </div>

                        {/* Queue Type Card */}
                        <div className="config-card">
                            <div className="card-header">
                                <div className="card-icon">👥</div>
                                <div className="card-title">
                                    <h2>Queue Type</h2>
                                    <p>Choose your preferred queue</p>
                                </div>
                            </div>
                            <div className="queue-buttons">
                                <button
                                    className={`queue-option ${queueType === 'solo' ? 'active' : ''}`}
                                    onClick={() => setQueueType('solo')}
                                >
                                    <span className="queue-icon">👤</span>
                                    <span>Solo/Duo</span>
                                </button>
                                <button
                                    className={`queue-option ${queueType === 'duo' ? 'active' : ''}`}
                                    onClick={() => setQueueType('duo')}
                                >
                                    <span className="queue-icon">👥</span>
                                    <span>Duo Queue</span>
                                </button>
                            </div>
                            {queueType === 'duo' && (
                                <div className="queue-note">
                                    <div className="note-icon">💡</div>
                                    <p>Duo queue adds 10% to the total price for coordinated boosting</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Summary */}
                    <div className="summary-section">
                        <div className="summary-card">
                            <div className="summary-header">
                                <h2>Order Summary</h2>
                                <div className="summary-badge">Placements Boost</div>
                            </div>

                            {/* Order Details */}
                            <div className="order-details">
                                <div className="detail-row">
                                    <span className="detail-label">Previous Rank:</span>
                                    <span className="detail-value">
                                        {getRankDisplayText()}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Games:</span>
                                    <span className="detail-value">{selectedPlacements} Placement Games</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Server:</span>
                                    <span className="detail-value">{server}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Queue:</span>
                                    <span className="detail-value">{queueType === 'solo' ? 'Solo/Duo' : 'Duo Queue'}</span>
                                </div>
                            </div>



                            {/* Savings Banner */}
                            <div className="savings-card">
                                <div className="savings-badge">
                                    <span className="savings-percent">-{prices.savingsPercent}%</span>
                                    <span className="savings-text">SAVINGS</span>
                                </div>
                                <div className="savings-content">
                                    <p>You save <strong>${prices.discount.toFixed(2)}</strong> on this order!</p>
                                    <span className="loyalty-points">+{loyaltyPoints} Loyalty Points</span>
                                </div>
                            </div>

                            <div className="price-summary">
                                {hasPreviousRank && (
                                    <div className="price-row">
                                        <span>Subtotal after rank multipliers</span>
                                        <span className="price-amount">
                                            ${prices.originalBasePrice.toFixed(2)}
                                        </span>
                                    </div>
                                )}
                                {prices.isDuo && (
                                    <div className="price-row info">
                                        <span>Duo Queue Surcharge</span>
                                        <span className="price-amount">+10%</span>
                                    </div>
                                )}
                                <div className="price-row discount">
                                    <span>Volume Discount</span>
                                    <span className="price-amount">-${prices.discount.toFixed(2)}</span>
                                </div>
                                <div className="price-row total">
                                    <span>Total</span>
                                    <div className="total-price">
                                        <span className="original-price">${prices.basePrice.toFixed(2)}</span>
                                        <span className="final-price">${prices.finalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Checkout Buttons */}
                            <div className="checkout-buttons">
                                <button className="checkout-primary">
                                    <span>Proceed to Checkout</span>
                                    <span className="checkout-arrow">→</span>
                                </button>
                                <button className="checkout-paypal">
                                    <span className="paypal-logo">PayPal</span>
                                    <span>Pay with PayPal</span>
                                </button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="trust-indicators">
                                <div className="trust-item">
                                    <div className="trust-icon">🔒</div>
                                    <span>Secure Payment</span>
                                </div>
                                <div className="trust-item">
                                    <div className="trust-icon">⏱️</div>
                                    <span>24/7 Support</span>
                                </div>
                                <div className="trust-item">
                                    <div className="trust-icon">✓</div>
                                    <span>Money-back Guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlacementsBoost;