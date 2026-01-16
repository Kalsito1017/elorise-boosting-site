import { useState, useEffect } from 'react';
import './DivisionBoost.css';

const ranks = [
    { id: 1, name: 'Iron', color: '#51484A', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 2, name: 'Bronze', color: '#A97142', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 3, name: 'Silver', color: '#B4B4B4', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 4, name: 'Gold', color: '#FFD700', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 5, name: 'Platinum', color: '#4FD1B7', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 6, name: 'Emerald', color: '#2ECC71', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 7, name: 'Diamond', color: '#6CB2EB', divisions: ['IV', 'III', 'II', 'I'] },
    { id: 8, name: 'Master+', color: '#9F7AEA', divisions: [] },
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
        lpPerWin: 'Normal (23+ LP)',
        currentLPInput: '', // For Master+ LP input
        currentLP: 0 // Numeric LP value for Master+
    });

    const [desiredRank, setDesiredRank] = useState({
        tier: 'Platinum',
        division: 'IV',
        lp: '0-20 LP',
        desiredLPInput: '', // For Master+ LP input
        desiredLP: 0 // Numeric LP value for Master+
    });

    const [server, setServer] = useState('North America');
    const [queueType, setQueueType] = useState('solo');

    const [priceDetails, setPriceDetails] = useState({
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        loyaltyPoints: 0,
        priceBreakdown: []
    });

    // Update desired LP when current LP changes (always +50 LP difference)
    useEffect(() => {
        if (currentRank.tier === 'Master+' && currentRank.currentLP > 0) {
            const newDesiredLP = currentRank.currentLP + 50;
            setDesiredRank(prev => ({
                ...prev,
                desiredLP: newDesiredLP,
                desiredLPInput: newDesiredLP.toString(),
                lp: `${newDesiredLP} LP`
            }));
        }
    }, [currentRank.currentLP, currentRank.tier]);

    // Calculate price whenever rank selection changes
    useEffect(() => {
        calculatePrice();
    }, [currentRank, desiredRank, queueType]);

    // NEW: Base prices per division boost
    const tierBasePrices = {
        'Iron': {
            basePrice: 9.99,
            divisionMultiplier: {
                'IV': 1.0, 'III': 1.1, 'II': 1.2, 'I': 1.3
            },
            promotionPrice: 14.99
        },
        'Bronze': {
            basePrice: 12.99,
            divisionMultiplier: {
                'IV': 1.0, 'III': 1.15, 'II': 1.3, 'I': 1.45
            },
            promotionPrice: 19.99
        },
        'Silver': {
            basePrice: 15.99,
            divisionMultiplier: {
                'IV': 1.0, 'III': 1.2, 'II': 1.4, 'I': 1.6
            },
            promotionPrice: 24.99
        },
        'Gold': {
            basePrice: 19.99,
            divisionMultiplier: {
                'IV': 1.0, 'III': 1.25, 'II': 1.5, 'I': 1.75
            },
            promotionPrice: 29.99
        },
        'Platinum': {
            basePrice: 24.99,
            divisionMultiplier: {
                'IV': 1.0, 'III': 1.3, 'II': 1.6, 'I': 1.9
            },
            promotionPrice: 37.99
        },
        'Emerald': {
            basePrice: 29.99,
            divisionMultiplier: {
                'IV': 1.0, 'III': 1.35, 'II': 1.7, 'I': 2.05
            },
            promotionPrice: 44.99
        },
        'Diamond': {
            basePrice: 39.99,
            divisionMultiplier: {
                'IV': 1.0, 'III': 1.4, 'II': 1.8, 'I': 2.2  // D4 is cheaper than D1
            },
            promotionPrice: 59.99
        },
        'Master+': {
            basePricePer100LP: 49.99, // Base price per 100 LP
            lpMultiplier: {
                '0-200': 1.0,
                '201-400': 1.5,
                '401-600': 2.2,
                '601-800': 3.0,
                '801-1000': 4.0,
                '1000+': 5.0
            }
        }
    };

    // NEW: LP multipliers based on LP per win selection
    const lpPerWinMultipliers = {
        'Very Low (8-15)': 0.9,
        'Low (16-22)': 1.0,
        'Normal (23+ LP)': 1.15
    };

    const calculatePrice = () => {
        let basePrice = 0;
        let priceBreakdown = [];

        // Master+ LP-based calculation
        if (currentRank.tier === 'Master+' && desiredRank.tier === 'Master+') {
            const lpDifference = desiredRank.desiredLP - currentRank.currentLP;
            const basePricePer100LP = tierBasePrices['Master+'].basePricePer100LP;

            // Determine which LP range multiplier to use (use the higher of current or desired)
            const currentLPRange = getMasterLPRange(currentRank.currentLP);
            const desiredLPRange = getMasterLPRange(desiredRank.desiredLP);
            const highestLPRange = Math.max(
                Object.keys(tierBasePrices['Master+'].lpMultiplier).indexOf(currentLPRange),
                Object.keys(tierBasePrices['Master+'].lpMultiplier).indexOf(desiredLPRange)
            );

            const lpMultiplierKey = Object.keys(tierBasePrices['Master+'].lpMultiplier)[highestLPRange];
            const lpMultiplier = tierBasePrices['Master+'].lpMultiplier[lpMultiplierKey];

            basePrice = (lpDifference / 100) * basePricePer100LP * lpMultiplier;

            priceBreakdown.push({
                label: 'LP Boost',
                value: `$${((lpDifference / 100) * basePricePer100LP).toFixed(2)}`
            });

            if (lpMultiplier > 1) {
                priceBreakdown.push({
                    label: `High LP Multiplier (${lpMultiplierKey} LP)`,
                    value: `×${lpMultiplier.toFixed(1)}`
                });
            }
        }
        // Regular tier calculation
        else {
            // Check if it's a same-tier division boost or tier promotion
            if (currentRank.tier === desiredRank.tier) {
                // Same tier division boost
                const tierData = tierBasePrices[currentRank.tier];
                const currentDivMultiplier = tierData.divisionMultiplier[currentRank.division] || 1.0;
                const desiredDivMultiplier = tierData.divisionMultiplier[desiredRank.division] || 1.0;

                // Calculate division difference multiplier
                const divisionDiff = Math.abs(
                    ['IV', 'III', 'II', 'I'].indexOf(desiredRank.division) -
                    ['IV', 'III', 'II', 'I'].indexOf(currentRank.division)
                );

                basePrice = tierData.basePrice * (1 + (divisionDiff * 0.25)) * desiredDivMultiplier;

                priceBreakdown.push({
                    label: `${currentRank.tier} Division Boost`,
                    value: `$${tierData.basePrice.toFixed(2)}`
                });

                if (divisionDiff > 0) {
                    priceBreakdown.push({
                        label: `${divisionDiff} division${divisionDiff > 1 ? 's' : ''} difference`,
                        value: `×${(1 + (divisionDiff * 0.25)).toFixed(2)}`
                    });
                }

                if (desiredDivMultiplier > 1) {
                    priceBreakdown.push({
                        label: `Higher division (${desiredRank.division})`,
                        value: `×${desiredDivMultiplier.toFixed(2)}`
                    });
                }
            } // Regular tier calculation
            else {
                const currentTierIndex = ranks.findIndex(r => r.name === currentRank.tier);
                const desiredTierIndex = ranks.findIndex(r => r.name === desiredRank.tier);

                // Check if it's a promotion or same-tier boost
                if (currentTierIndex === desiredTierIndex) {
                    // Same tier division boost
                    const tierData = tierBasePrices[currentRank.tier];

                    // FIX: Check if divisionMultiplier exists before accessing it
                    const hasDivisionMultiplier = tierData && tierData.divisionMultiplier;
                    const currentDivMultiplier = hasDivisionMultiplier
                        ? (tierData.divisionMultiplier[currentRank.division] || 1.0)
                        : 1.0;
                    const desiredDivMultiplier = hasDivisionMultiplier
                        ? (tierData.divisionMultiplier[desiredRank.division] || 1.0)
                        : 1.0;

                    basePrice = avgBasePrice * currentDivMultiplier * desiredDivMultiplier;

                    priceBreakdown.push({
                        label: `${currentRank.tier} → ${desiredRank.tier} Promotion`,
                        value: `$${avgBasePrice.toFixed(2)}`
                    });

                    if (currentDivMultiplier > 1) {
                        priceBreakdown.push({
                            label: `Starting from ${currentRank.division}`,
                            value: `×${currentDivMultiplier.toFixed(2)}`
                        });
                    }

                    if (desiredDivMultiplier > 1) {
                        priceBreakdown.push({
                            label: `Targeting ${desiredRank.division}`,
                            value: `×${desiredDivMultiplier.toFixed(2)}`
                        });
                    }
                }
            }
        }

        // Apply LP per win multiplier
        const lpWinMultiplier = lpPerWinMultipliers[currentRank.lpPerWin] || 1.0;
        if (lpWinMultiplier !== 1.0) {
            basePrice *= lpWinMultiplier;
            priceBreakdown.push({
                label: `LP per Win: ${currentRank.lpPerWin}`,
                value: `×${lpWinMultiplier.toFixed(2)}`
            });
        }

        // Apply queue type multiplier (15% increase for duo)
        if (queueType === 'duo') {
            basePrice *= 1.15;
            priceBreakdown.push({
                label: 'Duo Queue',
                value: '+15%'
            });
        }

        // Apply promotion discount if applicable
        let discountPercentage = 0;
        let discountMessage = '';

        // Check for multi-division/promotion discounts
        if (currentRank.tier !== desiredRank.tier) {
            discountPercentage = 0.10; // 10% off for tier promotions
            discountMessage = '🎉 10% OFF FOR TIER PROMOTION!';
        } else if (getDivisionDifference(currentRank.division, desiredRank.division) >= 2) {
            discountPercentage = 0.15; // 15% off for 2+ division jumps
            discountMessage = '🔥 15% OFF FOR MULTI-DIVISION BOOST!';
        }

        const discountAmount = basePrice * discountPercentage;
        const finalPrice = basePrice - discountAmount;

        // Calculate loyalty points
        let loyaltyPoints = Math.floor(basePrice); // 1 point per dollar base price

        // Bonus points for higher tiers
        const tierBonusPoints = {
            'Iron': 5, 'Bronze': 10, 'Silver': 15, 'Gold': 20,
            'Platinum': 30, 'Emerald': 40, 'Diamond': 50, 'Master+': 75
        };

        loyaltyPoints += tierBonusPoints[desiredRank.tier] || 0;

        // Extra points for big jumps
        if (currentRank.tier !== desiredRank.tier) {
            loyaltyPoints += 25; // Bonus for tier promotion
        }

        setPriceDetails({
            basePrice: parseFloat(basePrice.toFixed(2)),
            discount: parseFloat(discountAmount.toFixed(2)),
            finalPrice: parseFloat(finalPrice.toFixed(2)),
            discountPercentage: Math.round(discountPercentage * 100),
            discountMessage: discountMessage,
            loyaltyPoints: loyaltyPoints,
            priceBreakdown: priceBreakdown
        });
    };

    const getMasterLPRange = (lp) => {
        if (lp <= 200) return '0-200';
        if (lp <= 400) return '201-400';
        if (lp <= 600) return '401-600';
        if (lp <= 800) return '601-800';
        if (lp <= 1000) return '801-1000';
        return '1000+';
    };

    const getDivisionDifference = (div1, div2) => {
        const divisions = ['IV', 'III', 'II', 'I'];
        return Math.abs(divisions.indexOf(div2) - divisions.indexOf(div1));
    };

    const handleRankSelect = (type, field, value) => {
        if (type === 'current') {
            const newRank = { ...currentRank, [field]: value };

            // When switching to Master+, reset LP values
            if (field === 'tier' && value === 'Master+') {
                newRank.currentLPInput = '500';
                newRank.currentLP = 500;
                newRank.division = '';
                newRank.lp = '';
            }
            // When switching from Master+ to regular tier
            else if (field === 'tier' && currentRank.tier === 'Master+' && value !== 'Master+') {
                newRank.division = 'IV';
                newRank.lp = '0-20 LP';
                newRank.currentLPInput = '';
                newRank.currentLP = 0;
            }

            setCurrentRank(newRank);

            // Update desired rank tier if needed
            if (field === 'tier' && value === 'Master+') {
                setDesiredRank(prev => ({ ...prev, tier: 'Master+' }));
            }
        } else {
            setDesiredRank({ ...desiredRank, [field]: value });
        }
    };

    // Handle Master+ LP input changes
    const handleCurrentLPInputChange = (value) => {
        const lpValue = parseInt(value) || 0;
        setCurrentRank(prev => ({
            ...prev,
            currentLPInput: value,
            currentLP: lpValue,
            lp: `${lpValue} LP`
        }));
    };

    const handleDesiredLPInputChange = (value) => {
        const lpValue = parseInt(value) || 0;
        setDesiredRank(prev => ({
            ...prev,
            desiredLPInput: value,
            desiredLP: lpValue,
            lp: `${lpValue} LP`
        }));
    };

    return (
        <div className="get-started-page">
            <div className="get-started-container">
                {/* Left Panel - Configuration */}
                <div className="config-panel">
                    {/* Navigation between boost types */}
                    <div className="boost-type-nav">
                        <a href="/get-started/division" className="boost-nav-link active">
                            <div className="nav-card active">
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

                            {/* Division Selection or LP Input for Master+ */}
                            {currentRank.tier !== 'Master+' ? (
                                <>
                                    {/* Division Selection for non-Master+ */}
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

                                    {/* LP Selection for non-Master+ */}
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
                                    </div>
                                </>
                            ) : (
                                /* LP Input for Master+ */
                                <div className="lp-input-section">
                                    <h4>Current LP</h4>
                                    <div className="lp-input-container">
                                        <input
                                            type="number"
                                            className="lp-input"
                                            value={currentRank.currentLPInput}
                                            onChange={(e) => handleCurrentLPInputChange(e.target.value)}
                                            placeholder="Enter current LP"
                                            min="0"
                                            max="2000"
                                        />
                                        <span className="lp-suffix">LP</span>
                                    </div>
                                    <p className="lp-note">Enter your current LP points (0-2000)</p>
                                </div>
                            )}

                            {/* Average LP Per Win dropdown (for all tiers) */}
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

                            {/* Division Selection or LP Input for Master+ */}
                            {desiredRank.tier !== 'Master+' ? (
                                <>
                                    {/* Division Selection for non-Master+ */}
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

                                    {/* Desired LP for non-Master+ */}
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
                                </>
                            ) : (
                                /* LP Input for Master+ Desired Rank */
                                <div className="lp-input-section">
                                    <h4>Desired LP</h4>
                                    <div className="lp-input-container">
                                        <input
                                            type="number"
                                            className="lp-input"
                                            value={desiredRank.desiredLPInput}
                                            onChange={(e) => handleDesiredLPInputChange(e.target.value)}
                                            placeholder="Enter desired LP"
                                            min="0"
                                            max="2000"
                                        />
                                        <span className="lp-suffix">LP</span>
                                    </div>
                                    <p className="lp-note">Automatically set to current LP + 50</p>
                                </div>
                            )}
                        </div>

                        {/* Server Selection */}
                        <div className="server-section">
                            <h3>Server Selection</h3>
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
                                DUO (+15%)
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
                                    <span className="rank-value">
                                        {currentRank.tier === 'Master+'
                                            ? `Master+ (${currentRank.currentLP} LP)`
                                            : `${currentRank.tier} ${currentRank.division} (${currentRank.lp})`
                                        }
                                    </span>
                                </div>
                                <div className="arrow">→</div>
                                <div className="desired-rank-display">
                                    <span className="label">DESIRED:</span>
                                    <span className="rank-value">
                                        {desiredRank.tier === 'Master+'
                                            ? `Master+ (${desiredRank.desiredLP} LP)`
                                            : `${desiredRank.tier} ${desiredRank.division} (${desiredRank.lp})`
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Price Breakdown (New Section) */}
                        {priceDetails.priceBreakdown.length > 0 && (
                            <div className="boost-details" style={{ marginBottom: '1rem' }}>
                                <div className="detail-item" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.75rem' }}>
                                    <span className="detail-label" style={{ fontWeight: '600' }}>PRICE BREAKDOWN</span>
                                    <span className="detail-value" style={{ fontWeight: '600' }}>Amount</span>
                                </div>
                                {priceDetails.priceBreakdown.map((item, index) => (
                                    <div key={index} className="detail-item">
                                        <span className="detail-label">{item.label}</span>
                                        <span className="detail-value">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}

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
                                            {priceDetails.discountMessage}
                                        </span>
                                        <span className="upsell-message">
                                            You save ${priceDetails.discount.toFixed(2)} ({priceDetails.discountPercentage}% OFF!)
                                        </span>
                                    </div>
                                    <div className="loyalty-points">+{priceDetails.loyaltyPoints} Loyalty Points</div>
                                </div>
                            </div>
                        )}

                        {/* Price Summary */}
                        <div className="price-summary">
                            <div className="price-row">
                                <span className="price-label">Base Price:</span>
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

export default DivisionBoost;