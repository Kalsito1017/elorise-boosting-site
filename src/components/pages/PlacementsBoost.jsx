import { useState } from 'react';
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

// Add this missing array - Placement match options
const placementOptions = [
    { value: 1, label: '1 Game', price: 9.99 },
    { value: 2, label: '2 Games', price: 18.99 },
    { value: 3, label: '3 Games', price: 26.99 },
    { value: 4, label: '4 Games', price: 34.99 },
    { value: 5, label: '5 Games', price: 39.99 }
];

function PlacementsBoost() {
    const [lastSeasonRank, setLastSeasonRank] = useState({
        tier: 'Gold',
        division: 'IV'
    });

    const [server, setServer] = useState('North America');
    const [queueType, setQueueType] = useState('solo');
    const [selectedPlacements, setSelectedPlacements] = useState(5);
    const [hasPreviousRank, setHasPreviousRank] = useState(true);

    const handleRankSelect = (field, value) => {
        setLastSeasonRank({ ...lastSeasonRank, [field]: value });
    };

    // Price calculation function
    const calculatePricing = () => {
        const basePrice = placementOptions.find(opt => opt.value === selectedPlacements)?.price || 39.99;
        const discount = selectedPlacements === 5 ? 5.00 : selectedPlacements === 4 ? 3.00 : selectedPlacements === 3 ? 2.00 : selectedPlacements === 2 ? 1.00 : 0.50;

        // Duo queue adds 10% to price
        const duoMultiplier = queueType === 'duo' ? 1.10 : 1.00;

        const finalBasePrice = basePrice * duoMultiplier;
        const finalDiscount = discount * duoMultiplier;
        const finalPrice = finalBasePrice - finalDiscount;
        const savingsPercent = Math.round((finalDiscount / finalBasePrice) * 100);

        return {
            basePrice: finalBasePrice,
            discount: finalDiscount,
            finalPrice: finalPrice,
            savingsPercent: savingsPercent,
            isDuo: queueType === 'duo',
            duoMultiplier: duoMultiplier,
            originalBasePrice: basePrice,
            originalDiscount: discount
        };
    };

    const prices = calculatePricing();

    return (
        <div className="placements-page">


            <div className="placements-container">
                {/* Boost Type Navigation */}
                <div className="boost-navigation">
                    <div className="navigation-grid">
                        {boostTypes.map(boost => (
                            <div
                                key={boost.id}
                                className={`nav-card ${boost.id === 'placements' ? 'active' : ''}`}
                                onClick={() => window.location.href = boost.path}
                            >
                                <div className="nav-icon">{boost.icon}</div>
                                <div className="nav-content">
                                    <h3>{boost.name}</h3>
                                    <p>{boost.desc}</p>
                                </div>
                                <div className="nav-indicator"></div>
                            </div>
                        ))}
                    </div>
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
                                        {ranks.map(rank => (
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
                                        ))}
                                    </div>

                                    {/* Division Selection - Only show for ranks that have divisions */}
                                    {lastSeasonRank.tier &&
                                        ranks.find(r => r.name === lastSeasonRank.tier)?.divisions.length > 0 &&
                                        !['Master', 'GrandMaster', 'Challenger'].includes(lastSeasonRank.tier) && (
                                            <div className="division-selection">
                                                <h4>Division</h4>
                                                <div className="division-buttons">
                                                    {ranks.find(r => r.name === lastSeasonRank.tier)?.divisions.map(div => (
                                                        <button
                                                            key={div}
                                                            className={`division-pill ${lastSeasonRank.division === div ? 'active' : ''}`}
                                                            onClick={() => handleRankSelect('division', div)}
                                                        >
                                                            {div}
                                                        </button>
                                                    ))}
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
                                        {hasPreviousRank ?
                                            `${lastSeasonRank.tier}${['Master', 'GrandMaster', 'Challenger'].includes(lastSeasonRank.tier) ? '' : ' ' + lastSeasonRank.division}`
                                            : 'First Time'
                                        }
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
                                    <span className="loyalty-points">+45 Loyalty Points</span>
                                </div>
                            </div>

                            <div className="price-summary">
                                <div className="price-row">
                                    <span>Base Price</span>
                                    <span className="price-amount">
                                        ${prices.basePrice.toFixed(2)}
                                        {prices.isDuo && <span className="duo-badge">+10%</span>}
                                    </span>
                                </div>
                                {prices.isDuo && (
                                    <div className="price-row info">
                                        <span>Duo Queue Surcharge</span>
                                        <span className="price-amount">+10%</span>
                                    </div>
                                )}
                                <div className="price-row discount">
                                    <span>Discount</span>
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

                            {/* Trust Indicators - Added back */}
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