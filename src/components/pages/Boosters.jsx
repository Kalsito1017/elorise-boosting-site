import { useState } from 'react';
import './Boosters.css';

const boosters = [
    {
        id: 1,
        name: "ChallengerPro",
        rank: "Challenger",
        role: "Jungle/Mid",
        region: "EUW",
        winRate: "78%",
        totalGames: 2547,
        price: "$25/hr",
        rating: 4.9,
        reviews: 142,
        online: true,
        languages: ["EN", "DE", "FR"],
        avatarColor: "#7abfff"
    },
    {
        id: 2,
        name: "MasterClimb",
        rank: "Master",
        role: "Top/Jungle",
        region: "NA",
        winRate: "82%",
        totalGames: 1843,
        price: "$22/hr",
        rating: 4.8,
        reviews: 98,
        online: true,
        languages: ["EN", "ES"],
        avatarColor: "#2f9aff"
    },
    {
        id: 3,
        name: "GrandmasterBoost",
        rank: "Grandmaster",
        role: "ADC/Support",
        region: "KR",
        winRate: "85%",
        totalGames: 3120,
        price: "$30/hr",
        rating: 5.0,
        reviews: 210,
        online: false,
        languages: ["EN", "KR"],
        avatarColor: "#ff6b6b"
    },
    {
        id: 4,
        name: "DiamondSmurf",
        rank: "Diamond I",
        role: "Mid/ADC",
        region: "EUW",
        winRate: "76%",
        totalGames: 1567,
        price: "$18/hr",
        rating: 4.7,
        reviews: 76,
        online: true,
        languages: ["EN"],
        avatarColor: "#4caf50"
    },
    {
        id: 5,
        name: "ChallengerEU",
        rank: "Challenger",
        role: "Support/Top",
        region: "EUW",
        winRate: "80%",
        totalGames: 2890,
        price: "$28/hr",
        rating: 4.9,
        reviews: 167,
        online: true,
        languages: ["EN", "DE", "RU"],
        avatarColor: "#ffa726"
    },
    {
        id: 6,
        name: "MasterNA",
        rank: "Master",
        role: "Jungle/ADC",
        region: "NA",
        winRate: "79%",
        totalGames: 1987,
        price: "$21/hr",
        rating: 4.8,
        reviews: 89,
        online: true,
        languages: ["EN"],
        avatarColor: "#9c27b0"
    },
    {
        id: 7,
        name: "GrandmasterKR",
        rank: "Grandmaster",
        role: "Mid/Top",
        region: "KR",
        winRate: "83%",
        totalGames: 3450,
        price: "$32/hr",
        rating: 5.0,
        reviews: 245,
        online: false,
        languages: ["EN", "KR", "JP"],
        avatarColor: "#00bcd4"
    },
    {
        id: 8,
        name: "DiamondBoost",
        rank: "Diamond II",
        role: "ADC/Mid",
        region: "NA",
        winRate: "75%",
        totalGames: 1234,
        price: "$16/hr",
        rating: 4.6,
        reviews: 54,
        online: true,
        languages: ["EN", "ES"],
        avatarColor: "#795548"
    }, {
        id: 9,
        name: "ShadowClimb",
        rank: "Master",
        role: "Jungle",
        region: "EUW",
        winRate: "78%",
        totalGames: 1842,
        price: "$22/hr",
        rating: 4.9,
        reviews: 112,
        online: true,
        languages: ["EN", "FR"],
        avatarColor: "#3F51B5"
    },
    {
        id: 10,
        name: "RiftKing",
        rank: "Grandmaster",
        role: "Top",
        region: "KR",
        winRate: "81%",
        totalGames: 2567,
        price: "$30/hr",
        rating: 5.0,
        reviews: 198,
        online: false,
        languages: ["EN", "KR"],
        avatarColor: "#F44336"
    },
    {
        id: 11,
        name: "EloSurge",
        rank: "Diamond I",
        role: "Mid",
        region: "EUNE",
        winRate: "73%",
        totalGames: 1463,
        price: "$18/hr",
        rating: 4.7,
        reviews: 67,
        online: true,
        languages: ["EN"],
        avatarColor: "#009688"
    },
    {
        id: 12,
        name: "CarryCraft",
        rank: "Challenger",
        role: "ADC",
        region: "EUW",
        winRate: "85%",
        totalGames: 3121,
        price: "$45/hr",
        rating: 5.0,
        reviews: 324,
        online: true,
        languages: ["EN", "DE"],
        avatarColor: "#FF9800"
    },
    {
        id: 13,
        name: "MacroMind",
        rank: "Master",
        role: "Support",
        region: "NA",
        winRate: "76%",
        totalGames: 1678,
        price: "$20/hr",
        rating: 4.8,
        reviews: 89,
        online: false,
        languages: ["EN", "PT"],
        avatarColor: "#9C27B0"
    },
    {
        id: 14,
        name: "VoidClimber",
        rank: "Diamond III",
        role: "Jungle",
        region: "LAS",
        winRate: "71%",
        totalGames: 1205,
        price: "$15/hr",
        rating: 4.5,
        reviews: 42,
        online: true,
        languages: ["EN", "ES"],
        avatarColor: "#607D8B"
    },
    {
        id: 15,
        name: "SummitRush",
        rank: "Grandmaster",
        role: "Mid",
        region: "KR",
        winRate: "82%",
        totalGames: 2894,
        price: "$35/hr",
        rating: 4.9,
        reviews: 210,
        online: true,
        languages: ["KR", "EN"],
        avatarColor: "#E91E63"
    },
    {
        id: 16,
        name: "ClimbTheory",
        rank: "Diamond II",
        role: "Top/Jungle",
        region: "EUW",
        winRate: "74%",
        totalGames: 1337,
        price: "$17/hr",
        rating: 4.6,
        reviews: 58,
        online: false,
        languages: ["EN", "IT"],
        avatarColor: "#4CAF50"
    },
    {
        id: 17,
        name: "RiftVelocity",
        rank: "Master",
        role: "ADC",
        region: "OCE",
        winRate: "77%",
        totalGames: 1549,
        price: "$21/hr",
        rating: 4.8,
        reviews: 95,
        online: true,
        languages: ["EN"],
        avatarColor: "#FF5722"
    },
    {
        id: 18,
        name: "EloVanguard",
        rank: "Diamond I",
        role: "Mid/ADC",
        region: "EUW",
        winRate: "79%",
        totalGames: 1764,
        price: "$19/hr",
        rating: 4.7,
        reviews: 73,
        online: true,
        languages: ["EN", "ES", "DE"],
        avatarColor: "#2196F3"
    }


];

const regions = ["All", "EUW", "NA", "KR", "EUNE", "OCE", "LAN", "LAS", "BR"];
const ranks = ["All", "Challenger", "Grandmaster", "Master", "Diamond", "Platinum"];
const roles = ["All", "Top", "Jungle", "Mid", "ADC", "Support"];

export default function Boosters() {
    const [selectedRegion, setSelectedRegion] = useState("All");
    const [selectedRank, setSelectedRank] = useState("All");
    const [selectedRole, setSelectedRole] = useState("All");
    const [sortBy, setSortBy] = useState("rating");
    const [searchQuery, setSearchQuery] = useState("");
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [selectedBooster, setSelectedBooster] = useState(null);

    const filteredBoosters = boosters
        .filter(booster => {
            if (selectedRegion !== "All" && booster.region !== selectedRegion) return false;
            if (selectedRank !== "All" && !booster.rank.includes(selectedRank)) return false;
            if (selectedRole !== "All" && !booster.role.includes(selectedRole)) return false;
            if (showOnlineOnly && !booster.online) return false;
            if (searchQuery && !booster.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "rating": return b.rating - a.rating;
                case "priceLow": return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
                case "priceHigh": return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
                case "winRate": return parseFloat(b.winRate) - parseFloat(a.winRate);
                default: return b.rating - a.rating;
            }
        });

    const handleViewDetails = (booster) => {
        setSelectedBooster(booster);
    };

    const handleHireBooster = (booster) => {
        alert(`Hiring ${booster.name} for ${booster.price}/hour`);
        // In real app, this would navigate to booking/payment page
    };

    const getRegionFlag = (region) => {
        const flags = {
            "EUW": "🇪🇺",
            "NA": "🇺🇸",
            "KR": "🇰🇷",
            "EUNE": "🇪🇺",
            "OCE": "🇦🇺",
            "LAN": "🇲🇽",
            "LAS": "🇦🇷",
            "BR": "🇧🇷"
        };
        return flags[region] || "🌍";
    };

    const getRoleIcon = (role) => {
        const icons = {
            "Top": "⚔️",
            "Jungle": "🌳",
            "Mid": "🎯",
            "ADC": "🎯",
            "Support": "🛡️"
        };
        return icons[role] || "🎮";
    };

    return (
        <main className="boosters-page">
            {/* Hero Section */}
            <section className="boosters-hero">
                <div className="boosters-hero-content">
                    <h1>Professional Boosters</h1>
                    <p>Choose from our elite team of Challenger, Grandmaster, and Master tier players</p>
                </div>
            </section>

            {/* Filters Section */}
            <section className="filters-section">
                <div className="filters-container">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search boosters by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>

                    <div className="filter-group">
                        <div className="filter">
                            <label>Region</label>
                            <select
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                className="filter-select"
                            >
                                {regions.map(region => (
                                    <option key={region} value={region}>
                                        {region === "All" ? "All Regions" : `${getRegionFlag(region)} ${region}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter">
                            <label>Rank</label>
                            <select
                                value={selectedRank}
                                onChange={(e) => setSelectedRank(e.target.value)}
                                className="filter-select"
                            >
                                {ranks.map(rank => (
                                    <option key={rank} value={rank}>
                                        {rank === "All" ? "All Ranks" : rank}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter">
                            <label>Role</label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="filter-select"
                            >
                                {roles.map(role => (
                                    <option key={role} value={role}>
                                        {role === "All" ? "All Roles" : `${getRoleIcon(role)} ${role}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter">
                            <label>Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="filter-select"
                            >
                                <option value="rating">Highest Rating</option>
                                <option value="priceLow">Price: Low to High</option>
                                <option value="priceHigh">Price: High to Low</option>
                                <option value="winRate">Win Rate</option>
                            </select>
                        </div>

                        <div className="filter checkbox-filter">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={showOnlineOnly}
                                    onChange={(e) => setShowOnlineOnly(e.target.checked)}
                                />
                                <span>Show Online Only</span>
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Summary */}
            <section className="stats-summary">
                <div className="stat-card">
                    <div className="stat-number">{boosters.length}</div>
                    <div className="stat-label">Total Boosters</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">87%</div>
                    <div className="stat-label">Average Win Rate</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">4.8</div>
                    <div className="stat-label">Average Rating</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Support Available</div>
                </div>
            </section>

            {/* Boosters Grid */}
            <section className="boosters-grid-section">
                <div className="section-header">
                    <h2>Available Boosters ({filteredBoosters.length})</h2>
                    <div className="online-counter">
                        <span className="online-dot"></span>
                        {boosters.filter(b => b.online).length} Online
                    </div>
                </div>

                <div className="boosters-grid">
                    {filteredBoosters.map(booster => (
                        <div key={booster.id} className="booster-card">
                            <div className="booster-header">
                                <div
                                    className="booster-avatar"
                                    style={{ backgroundColor: booster.avatarColor }}
                                >
                                    {booster.name.charAt(0)}
                                </div>
                                <div className="booster-info">
                                    <div className="booster-name-row">
                                        <h3>{booster.name}</h3>
                                        <span className={`status-dot ${booster.online ? 'online' : 'offline'}`}>
                                            {booster.online ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div className="booster-tags">
                                        <span className="rank-tag">{booster.rank}</span>
                                        <span className="region-tag">
                                            {getRegionFlag(booster.region)} {booster.region}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="booster-stats">
                                <div className="stat-item">
                                    <div className="stat-label">Win Rate</div>
                                    <div className="stat-value">{booster.winRate}</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">Total Games</div>
                                    <div className="stat-value">{booster.totalGames.toLocaleString()}</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">Price</div>
                                    <div className="stat-value price">{booster.price}</div>
                                </div>
                            </div>

                            <div className="booster-roles">
                                <div className="roles-label">Main Roles:</div>
                                <div className="roles-list">
                                    {booster.role.split('/').map((role, index) => (
                                        <span key={index} className="role-tag">
                                            {getRoleIcon(role)} {role}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="booster-languages">
                                <div className="languages-label">Languages:</div>
                                <div className="languages-list">
                                    {booster.languages.map((lang, index) => (
                                        <span key={index} className="language-tag">{lang}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="booster-rating">
                                <div className="stars">
                                    {'★'.repeat(Math.floor(booster.rating))}
                                    {booster.rating % 1 >= 0.5 && '⭐'}
                                    <span className="rating-number">{booster.rating}</span>
                                </div>
                                <div className="reviews">({booster.reviews} reviews)</div>
                            </div>

                            <div className="booster-actions">
                                <button
                                    className="btn-details"
                                    onClick={() => handleViewDetails(booster)}
                                >
                                    View Details
                                </button>
                                <button
                                    className="btn-hire"
                                    onClick={() => handleHireBooster(booster)}
                                >
                                    Hire Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredBoosters.length === 0 && (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <h3>No boosters found</h3>
                        <p>Try adjusting your filters or search terms</p>
                        <button
                            className="btn-reset"
                            onClick={() => {
                                setSelectedRegion("All");
                                setSelectedRank("All");
                                setSelectedRole("All");
                                setSearchQuery("");
                            }}
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3>Choose Your Booster</h3>
                        <p>Select from our verified professional players based on rank, role, and region.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>Place Your Order</h3>
                        <p>Select your desired rank and duration. Make secure payment.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>Track Progress</h3>
                        <p>Monitor your boost in real-time. Communicate directly with your booster.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">4</div>
                        <h3>Receive Account</h3>
                        <p>Get your boosted account back with guaranteed rank achievement.</p>
                    </div>
                </div>
            </section>

            {/* Booster Details Modal */}
            {selectedBooster && (
                <div className="modal-overlay" onClick={() => setSelectedBooster(null)}>
                    <div className="booster-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Booster Details</h2>
                            <button className="close-btn" onClick={() => setSelectedBooster(null)}>×</button>
                        </div>

                        <div className="modal-content">
                            <div className="modal-booster-header">
                                <div
                                    className="modal-avatar"
                                    style={{ backgroundColor: selectedBooster.avatarColor }}
                                >
                                    {selectedBooster.name.charAt(0)}
                                </div>
                                <div className="modal-booster-info">
                                    <h3>{selectedBooster.name}</h3>
                                    <div className="modal-tags">
                                        <span className="rank-tag">{selectedBooster.rank}</span>
                                        <span className="region-tag">
                                            {getRegionFlag(selectedBooster.region)} {selectedBooster.region}
                                        </span>
                                        <span className={`status-tag ${selectedBooster.online ? 'online' : 'offline'}`}>
                                            {selectedBooster.online ? 'Online Now' : 'Currently Offline'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-stats">
                                <div className="modal-stat">
                                    <div className="modal-stat-label">Win Rate</div>
                                    <div className="modal-stat-value">{selectedBooster.winRate}</div>
                                </div>
                                <div className="modal-stat">
                                    <div className="modal-stat-label">Total Games</div>
                                    <div className="modal-stat-value">{selectedBooster.totalGames.toLocaleString()}</div>
                                </div>
                                <div className="modal-stat">
                                    <div className="modal-stat-label">Hourly Rate</div>
                                    <div className="modal-stat-value price">{selectedBooster.price}</div>
                                </div>
                                <div className="modal-stat">
                                    <div className="modal-stat-label">Rating</div>
                                    <div className="modal-stat-value">
                                        {'★'.repeat(Math.floor(selectedBooster.rating))}
                                        <span className="rating-number">{selectedBooster.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-details">
                                <div className="detail-section">
                                    <h4>Main Roles</h4>
                                    <div className="roles-list">
                                        {selectedBooster.role.split('/').map((role, index) => (
                                            <span key={index} className="role-tag large">
                                                {getRoleIcon(role)} {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h4>Languages</h4>
                                    <div className="languages-list">
                                        {selectedBooster.languages.map((lang, index) => (
                                            <span key={index} className="language-tag large">{lang}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h4>Availability</h4>
                                    <ul className="availability-list">
                                        <li>✅ Available for immediate start</li>
                                        <li>✅ 24/7 customer support</li>
                                        <li>✅ Solo/Duo queue available</li>
                                        <li>✅ Stream available upon request</li>
                                    </ul>
                                </div>

                                <div className="detail-section">
                                    <h4>About This Booster</h4>
                                    <p className="booster-bio">
                                        Professional League of Legends player with extensive experience in competitive boosting.
                                        Specializes in {selectedBooster.role.toLowerCase()} roles with consistent high performance.
                                        Known for quick completion times and excellent communication.
                                    </p>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button
                                    className="btn-secondary"
                                    onClick={() => setSelectedBooster(null)}
                                >
                                    Back to List
                                </button>
                                <button
                                    className="btn-primary"
                                    onClick={() => handleHireBooster(selectedBooster)}
                                >
                                    Hire {selectedBooster.name} for {selectedBooster.price}/hour
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}