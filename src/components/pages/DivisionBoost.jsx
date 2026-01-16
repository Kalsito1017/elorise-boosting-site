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

const masterLPOptions = [
    '0 LP (Just hit Master+)',
    '1 - 100 LP',
    '101 - 200 LP',
    '201 - 300 LP',
    '301 - 400 LP',
    '401 - 500 LP',
    '501 - 600 LP',
    '601 - 700 LP',
    '701 - 800 LP',
    '801 - 900 LP',
    '901 - 1000 LP',
    '1000+ LP'
];

const servers = [
    'North America',
    'Europe West',
    'Europe Nordic & East',
    'Korea',
    'Japan',
    'Brazil',
    'Turkey',
    'Vietnam'
];

const tierBasePrices = {
    'Iron': {
        basePrice: 9.99,
        divisionMultiplier: { 'IV': 1.0, 'III': 1.1, 'II': 1.2, 'I': 1.3 },
        promotionPrice: 14.99,
        masterPromotionBasePrice: 1440.00,
        masterLPPer100: 35.00
    },
    'Bronze': {
        basePrice: 12.99,
        divisionMultiplier: { 'IV': 1.0, 'III': 1.15, 'II': 1.3, 'I': 1.45 },
        promotionPrice: 19.99,
        masterPromotionBasePrice: 1403.00,
        masterLPPer100: 38.00
    },
    'Silver': {
        basePrice: 15.99,
        divisionMultiplier: { 'IV': 1.0, 'III': 1.2, 'II': 1.4, 'I': 1.6 },
        promotionPrice: 24.99,
        masterPromotionBasePrice: 1350.00,
        masterLPPer100: 42.00
    },
    'Gold': {
        basePrice: 19.99,
        divisionMultiplier: { 'IV': 1.0, 'III': 1.25, 'II': 1.5, 'I': 1.75 },
        promotionPrice: 29.99,
        masterPromotionBasePrice: 1290.00,
        masterLPPer100: 48.00
    },
    'Platinum': {
        basePrice: 24.99,
        divisionMultiplier: { 'IV': 1.0, 'III': 1.3, 'II': 1.6, 'I': 1.9 },
        promotionPrice: 37.99,
        masterPromotionBasePrice: 1220.00,
        masterLPPer100: 55.00
    },
    'Emerald': {
        basePrice: 29.99,
        divisionMultiplier: { 'IV': 1.0, 'III': 1.35, 'II': 1.7, 'I': 2.05 },
        promotionPrice: 44.99,
        masterPromotionBasePrice: 1140.00,
        masterLPPer100: 65.00
    },
    'Diamond': {
        basePrice: 39.99,
        divisionMultiplier: { 'IV': 1.0, 'III': 1.4, 'II': 1.8, 'I': 2.2 },
        promotionPrice: 59.99,
        masterPromotionBasePrice: 1050.00,
        masterLPPer100: 75.00
    },
    'Master+': {
        basePricePer100LP: 49.99,
        lpMultiplier: {
            '0-200': 1.0, '201-400': 1.5, '401-600': 2.2,
            '601-800': 3.0, '801-1000': 4.0, '1000+': 5.0
        }
    }
};

const lpPerWinMultipliers = {
    'Very Low (8-15)': 0.9,
    'Low (16-22)': 1.0,
    'Normal (23+ LP)': 1.15
};

function DivisionBoost() {
    // Current Rank State
    const [currentRank, setCurrentRank] = useState({
        tier: 'Gold',
        division: 'IV',
        lp: '0-20 LP',
        lpPerWin: 'Normal (23+ LP)',
        currentLP: 0,
        currentLPInput: ''
    });

    // Desired Rank State
    const [desiredRank, setDesiredRank] = useState({
        tier: 'Platinum',
        division: 'IV',
        lp: '0-20 LP',
        desiredLP: 0,
        desiredLPDisplay: '0 LP (Just hit Master+)'
    });

    const [server, setServer] = useState('Vietnam');
    const [queueType, setQueueType] = useState('solo');
    const [priceDetails, setPriceDetails] = useState({
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        loyaltyPoints: 0,
        priceBreakdown: []
    });

    // Helper functions
    const getLPFromString = (lpString) => {
        if (!lpString) return 0;
        const match = lpString.match(/\d+/g);
        return match ? parseInt(match[0]) : 0;
    };

    const getMasterLPRange = (lp) => {
        if (lp <= 200) return '0-200';
        if (lp <= 400) return '201-400';
        if (lp <= 600) return '401-600';
        if (lp <= 800) return '601-800';
        if (lp <= 1000) return '801-1000';
        return '1000+';
    };

    // Check if desired rank is valid
    const isDesiredRankValid = () => {
        // Master+ to Master+
        if (currentRank.tier === 'Master+' && desiredRank.tier === 'Master+') {
            return desiredRank.desiredLP > currentRank.currentLP;
        }

        // Regular tier to Master+
        if (desiredRank.tier === 'Master+') {
            return true;
        }

        // Tier comparison for non-Master+
        const currentTierIndex = ranks.findIndex(r => r.name === currentRank.tier);
        const desiredTierIndex = ranks.findIndex(r => r.name === desiredRank.tier);

        if (desiredTierIndex < currentTierIndex) return false;
        if (currentTierIndex < desiredTierIndex) return true;

        // Same tier
        const divisions = ['IV', 'III', 'II', 'I'];
        const currentDivIndex = divisions.indexOf(currentRank.division);
        const desiredDivIndex = divisions.indexOf(desiredRank.division);

        if (desiredDivIndex > currentDivIndex) return true;
        if (desiredDivIndex < currentDivIndex) return false;

        // Same division, check LP
        const currentLPNum = getLPFromString(currentRank.lp);
        const desiredLPNum = getLPFromString(desiredRank.lp);
        return desiredLPNum > currentLPNum;
    };

    // Handle current rank selection
    const handleCurrentRankSelect = (field, value) => {
        setCurrentRank(prev => {
            const newRank = { ...prev, [field]: value };

            // When switching to Master+
            if (field === 'tier' && value === 'Master+') {
                newRank.division = '';
                newRank.lp = '';
                newRank.currentLP = 500;
                newRank.currentLPInput = '500';

                // Update desired rank to Master+
                setDesiredRank(prevDesired => ({
                    ...prevDesired,
                    tier: 'Master+',
                    division: '',
                    desiredLP: 550,
                    desiredLPDisplay: '100 LP'
                }));
            }
            // When switching from Master+ to regular tier
            else if (field === 'tier' && prev.tier === 'Master+' && value !== 'Master+') {
                newRank.division = 'IV';
                newRank.lp = '0-20 LP';
                newRank.currentLP = 0;
                newRank.currentLPInput = '';
            }
            // When LP changes for non-Master+
            else if (field === 'lp' && prev.tier !== 'Master+') {
                newRank.currentLP = getLPFromString(value);
            }

            return newRank;
        });
    };

    // Handle current LP input for Master+
    const handleCurrentLPInputChange = (value) => {
        const lpValue = parseInt(value) || 0;
        setCurrentRank(prev => ({
            ...prev,
            currentLP: lpValue,
            currentLPInput: value
        }));

        // Update desired LP to be higher
        if (lpValue > 0) {
            const newDesiredLP = lpValue + 100;
            setDesiredRank(prev => ({
                ...prev,
                desiredLP: newDesiredLP,
                desiredLPDisplay: newDesiredLP <= 1000 ? `${newDesiredLP} LP` : '1000+ LP'
            }));
        }
    };

    // Handle desired rank selection
    const handleDesiredRankSelect = (field, value) => {
        setDesiredRank(prev => {
            const newDesired = { ...prev, [field]: value };

            // When switching to Master+
            if (field === 'tier' && value === 'Master+') {
                newDesired.division = '';
                newDesired.lp = '';
                newDesired.desiredLP = 0;
                newDesired.desiredLPDisplay = '0 LP (Just hit Master+)';
            }
            // When desired LP is selected for Master+
            else if (field === 'desiredLPDisplay' && prev.tier === 'Master+') {
                const lpValue = value.includes('1000+') ? 1000 : parseInt(value) || 0;
                newDesired.desiredLP = lpValue;
                newDesired.desiredLPDisplay = value;
            }
            // When switching from Master+ to regular tier
            else if (field === 'tier' && prev.tier === 'Master+' && value !== 'Master+') {
                newDesired.division = 'IV';
                newDesired.lp = '0-20 LP';
                newDesired.desiredLP = 0;
                newDesired.desiredLPDisplay = '';
            }
            // When LP changes for non-Master+
            else if (field === 'lp' && prev.tier !== 'Master+') {
                newDesired.desiredLP = getLPFromString(value);
            }

            return newDesired;
        });
    };

    // Calculate price
    const calculatePrice = () => {
        if (!isDesiredRankValid()) {
            setPriceDetails({
                basePrice: 0,
                discount: 0,
                finalPrice: 0,
                loyaltyPoints: 0,
                priceBreakdown: [{
                    label: 'Invalid Selection',
                    value: 'Please choose a higher rank'
                }]
            });
            return;
        }

        let basePrice = 0;
        let priceBreakdown = [];

        // Case 1: Master+ to Master+ (LP-based pricing)
        if (currentRank.tier === 'Master+' && desiredRank.tier === 'Master+') {
            const lpDifference = desiredRank.desiredLP - currentRank.currentLP;
            const basePricePer100LP = tierBasePrices['Master+'].basePricePer100LP;

            // Get LP range multiplier
            const currentLPRange = getMasterLPRange(currentRank.currentLP);
            const lpMultiplier = tierBasePrices['Master+'].lpMultiplier[currentLPRange] || 1.0;

            basePrice = (lpDifference / 100) * basePricePer100LP * lpMultiplier;

            priceBreakdown.push({
                label: `Master+ LP Boost (+${lpDifference} LP)`,
                value: `$${((lpDifference / 100) * basePricePer100LP).toFixed(2)}`
            });

            if (lpMultiplier > 1) {
                priceBreakdown.push({
                    label: `High LP Range (${currentLPRange})`,
                    value: `×${lpMultiplier.toFixed(1)}`
                });
            }
        }
        // Case 2: Regular tier to Master+ promotion
        else if (desiredRank.tier === 'Master+') {
            const currentTierData = tierBasePrices[currentRank.tier];
            const divisionMultiplier = currentTierData.divisionMultiplier[currentRank.division] || 1.0;

            // Base price for promotion to Master+
            basePrice = currentTierData.masterPromotionBasePrice * divisionMultiplier;

            // Add LP cost for desired LP in Master+
            if (desiredRank.desiredLP > 0) {
                const lpAdditionalCost = (desiredRank.desiredLP / 100) * currentTierData.masterLPPer100;
                basePrice += lpAdditionalCost;

                priceBreakdown.push({
                    label: `${currentRank.tier} → Master+ Promotion`,
                    value: `$${(currentTierData.masterPromotionBasePrice * divisionMultiplier).toFixed(2)}`
                });

                priceBreakdown.push({
                    label: `Additional ${desiredRank.desiredLP} LP in Master+`,
                    value: `+$${lpAdditionalCost.toFixed(2)}`
                });
            } else {
                priceBreakdown.push({
                    label: `${currentRank.tier} → Master+ Full Promotion`,
                    value: `$${(currentTierData.masterPromotionBasePrice * divisionMultiplier).toFixed(2)}`
                });
            }

            if (divisionMultiplier > 1) {
                priceBreakdown.push({
                    label: `Starting from ${currentRank.division}`,
                    value: `×${divisionMultiplier.toFixed(2)}`
                });
            }
        }
        // Case 3: Regular tier to regular tier (simplified for now)
        else {
            const currentTierIndex = ranks.findIndex(r => r.name === currentRank.tier);
            const desiredTierIndex = ranks.findIndex(r => r.name === desiredRank.tier);

            if (currentTierIndex === desiredTierIndex) {
                // Same tier division boost
                const tierData = tierBasePrices[currentRank.tier];
                basePrice = tierData.basePrice;
                priceBreakdown.push({
                    label: `${currentRank.tier} Division Boost`,
                    value: `$${tierData.basePrice.toFixed(2)}`
                });
            } else {
                // Tier promotion
                const higherTier = currentTierIndex > desiredTierIndex ? currentRank.tier : desiredRank.tier;
                const tierData = tierBasePrices[higherTier];
                basePrice = tierData.promotionPrice;
                priceBreakdown.push({
                    label: `${currentRank.tier} → ${desiredRank.tier} Promotion`,
                    value: `$${tierData.promotionPrice.toFixed(2)}`
                });
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

        // Apply queue type multiplier
        if (queueType === 'duo') {
            basePrice *= 1.10;
            priceBreakdown.push({
                label: 'Duo Queue',
                value: '+10%'
            });
        }

        // Calculate loyalty points
        let loyaltyPoints = Math.floor(basePrice * 1.5);
        const tierBonusPoints = {
            'Iron': 10, 'Bronze': 20, 'Silver': 30, 'Gold': 40,
            'Platinum': 60, 'Emerald': 80, 'Diamond': 100, 'Master+': 150
        };
        loyaltyPoints += tierBonusPoints[desiredRank.tier] || 0;

        // Apply discount for Master+ promotions
        let discount = 0;
        let discountPercentage = 0;
        if (desiredRank.tier === 'Master+' && desiredRank.desiredLP >= 500) {
            discountPercentage = 0.10; // 10% discount for 500+ LP
            discount = basePrice * discountPercentage;
            priceBreakdown.push({
                label: 'Bulk LP Discount (500+ LP)',
                value: `-${(discountPercentage * 100)}%`
            });
        }

        const finalPrice = basePrice - discount;

        setPriceDetails({
            basePrice: parseFloat(basePrice.toFixed(2)),
            discount: parseFloat(discount.toFixed(2)),
            discountPercentage: Math.round(discountPercentage * 100),
            finalPrice: parseFloat(finalPrice.toFixed(2)),
            loyaltyPoints: loyaltyPoints,
            priceBreakdown: priceBreakdown
        });
    };

    // Recalculate price when dependencies change
    useEffect(() => {
        calculatePrice();
    }, [currentRank, desiredRank, queueType]);

    // Get additional LP cost for Master+
    const getAdditionalLPCost = () => {
        if (desiredRank.tier === 'Master+' && currentRank.tier !== 'Master+') {
            const currentTierData = tierBasePrices[currentRank.tier];
            if (!currentTierData) return 0;

            const lpValue = desiredRank.desiredLPDisplay.includes('1000+') ? 1000 :
                parseInt(desiredRank.desiredLPDisplay) || 0;
            return (lpValue / 100) * currentTierData.masterLPPer100;
        }
        return 0;
    };

    return (
        <div className="get-started-page">
            <div className="get-started-container">
                {/* Left Panel - Configuration */}
                <div className="config-panel">
                    {/* Boost Type Navigation */}
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

                    {/* Current Rank Section */}
                    <div className="section-header">
                        <h2>Current Rank</h2>
                        <p className="section-subtitle">Select your current tier and division.</p>
                    </div>

                    <div className="rank-selection-section">
                        <div className="rank-selector">
                            {/* Tier Selection */}
                            <div className="tier-grid">
                                {ranks.map(rank => (
                                    <div
                                        key={rank.id}
                                        className={`tier-option ${currentRank.tier === rank.name ? 'selected' : ''}`}
                                        onClick={() => handleCurrentRankSelect('tier', rank.name)}
                                        style={{
                                            borderColor: currentRank.tier === rank.name ? rank.color : 'transparent',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div className="tier-icon" style={{ backgroundColor: rank.color }}>
                                            {rank.name.charAt(0)}
                                        </div>
                                        <span>{rank.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Division Selection or LP Input based on tier */}
                            {currentRank.tier !== 'Master+' ? (
                                <>
                                    {/* Division Selection */}
                                    <div className="division-section">
                                        <h4>Division</h4>
                                        <div className="division-grid">
                                            {ranks.find(r => r.name === currentRank.tier)?.divisions.map(div => (
                                                <button
                                                    key={div}
                                                    className={`division-btn ${currentRank.division === div ? 'active' : ''}`}
                                                    onClick={() => handleCurrentRankSelect('division', div)}
                                                >
                                                    {div}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* LP Selection */}
                                    <div className="lp-section">
                                        <h4>Current LP</h4>
                                        <select
                                            className="lp-select"
                                            value={currentRank.lp}
                                            onChange={(e) => handleCurrentRankSelect('lp', e.target.value)}
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

                            {/* Average LP Per Win */}
                            <div className="avg-lp-section">
                                <h4>AVG. LP PER WIN:</h4>
                                <select
                                    className="lp-select"
                                    value={currentRank.lpPerWin}
                                    onChange={(e) => handleCurrentRankSelect('lpPerWin', e.target.value)}
                                >
                                    <option value="Very Low (8-15)">Very Low (8-15) - 10% Cheaper</option>
                                    <option value="Low (16-22)">Low (16-22) - Standard</option>
                                    <option value="Normal (23+ LP)">Normal (23+ LP) - 15% More</option>
                                </select>
                            </div>
                        </div>

                        {/* Desired Rank Section */}
                        <div className="section-header">
                            <h2>Desired Rank</h2>
                            <p className="section-subtitle">Select your desired tier and division.</p>
                        </div>

                        <div className="rank-selector">
                            {/* Tier Selection */}
                            <div className="tier-grid">
                                {ranks.map(rank => {
                                    const isCurrentMasterPlus = currentRank.tier === 'Master+';
                                    const isDisabled = isCurrentMasterPlus && rank.name !== 'Master+';

                                    return (
                                        <div
                                            key={rank.id}
                                            className={`tier-option ${desiredRank.tier === rank.name ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                                            onClick={() => !isDisabled && handleDesiredRankSelect('tier', rank.name)}
                                            style={{
                                                borderColor: desiredRank.tier === rank.name ? rank.color : 'transparent',
                                                opacity: isDisabled ? 0.5 : 1,
                                                cursor: isDisabled ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            <div className="tier-icon" style={{ backgroundColor: rank.color }}>
                                                {rank.name.charAt(0)}
                                            </div>
                                            <span>{rank.name}</span>
                                            {isDisabled && (
                                                <div style={{ fontSize: '0.6rem', color: '#ff6b6b', marginTop: '0.25rem' }}>
                                                    Not Available
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Desired Rank Inputs */}
                            {desiredRank.tier === 'Master+' ? (
                                <div className="lp-input-section">
                                    <h4>Desired LP in Master+</h4>
                                    <div className="master-lp-selector">
                                        <select
                                            className="lp-select"
                                            value={desiredRank.desiredLPDisplay}
                                            onChange={(e) => handleDesiredRankSelect('desiredLPDisplay', e.target.value)}
                                        >
                                            {masterLPOptions.map((option) => {
                                                const lpValue = option.includes('1000+') ? 1000 :
                                                    parseInt(option) || 0;
                                                const additionalCost = getAdditionalLPCost();
                                                const showPrice = currentRank.tier !== 'Master+';

                                                return (
                                                    <option key={option} value={option}>
                                                        {option}
                                                        {showPrice && lpValue > 0 && ` (+$${((lpValue / 100) * (tierBasePrices[currentRank.tier]?.masterLPPer100 || 49.99)).toFixed(2)})`}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <p className="lp-note">
                                        Price increases with higher LP targets
                                    </p>
                                    {desiredRank.desiredLP > 0 && currentRank.tier !== 'Master+' && (
                                        <div className="lp-preview-card">
                                            <div className="lp-preview-row">
                                                <span className="lp-preview-label">Additional LP Boost:</span>
                                                <span className="lp-preview-value">+{desiredRank.desiredLP} LP</span>
                                            </div>
                                            <div className="lp-preview-row">
                                                <span className="lp-preview-label">Extra Cost:</span>
                                                <span className="lp-preview-price">
                                                    +${getAdditionalLPCost().toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {/* Division Selection */}
                                    <div className="division-section">
                                        <h4>Division</h4>
                                        <div className="division-grid">
                                            {ranks.find(r => r.name === desiredRank.tier)?.divisions.map(div => (
                                                <button
                                                    key={div}
                                                    className={`division-btn ${desiredRank.division === div ? 'active' : ''}`}
                                                    onClick={() => handleDesiredRankSelect('division', div)}
                                                >
                                                    {div}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* LP Selection */}
                                    <div className="lp-section">
                                        <h4>Desired LP</h4>
                                        <select
                                            className="lp-select"
                                            value={desiredRank.lp}
                                            onChange={(e) => handleDesiredRankSelect('lp', e.target.value)}
                                        >
                                            {lpRanges.map(lp => (
                                                <option key={lp} value={lp}>{lp}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Server Selection */}
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
                                    DUO (+10%)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Summary */}
                <div className="summary-panel">
                    <div className="order-summary">
                        <h2>ORDER SUMMARY</h2>

                        {/* Current and Desired Rank Display */}
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

                        {/* Price Breakdown */}
                        {priceDetails.priceBreakdown.length > 0 && priceDetails.priceBreakdown[0].label !== 'Invalid Selection' && (
                            <div className="boost-details">
                                <div className="detail-item header">
                                    <span className="detail-label">PRICE BREAKDOWN</span>
                                    <span className="detail-value">Amount</span>
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
                                    {queueType === 'duo' && ' (+10%)'}
                                </span>
                            </div>
                        </div>

                        {/* Master+ Pricing Info */}
                        {desiredRank.tier === 'Master+' && currentRank.tier !== 'Master+' && (
                            <div className="info-card master-plus-info">
                                <div className="info-icon">🎯</div>
                                <div className="info-content">
                                    <div className="info-title">MASTER+ PROMOTION</div>
                                    <div className="info-subtitle">
                                        Base: ${tierBasePrices[currentRank.tier]?.masterPromotionBasePrice?.toFixed(2) || '0.00'}
                                        {desiredRank.desiredLP > 0 && (
                                            <span> + ${getAdditionalLPCost().toFixed(2)} for {desiredRank.desiredLP} LP</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Savings Banner */}
                        {priceDetails.discount > 0 && (
                            <div className="savings-banner">
                                <div className="savings-content">
                                    <div className="savings-text">
                                        <span className="savings-message">
                                            {desiredRank.desiredLP >= 500 ? 'BULK LP DISCOUNT!' : 'SPECIAL DISCOUNT!'}
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
                                    <span className="price-value">+10%</span>
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
                                        <span className="old-price">${(priceDetails.basePrice + priceDetails.discount).toFixed(2)}</span>
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