export default function BoosterDetailsModal({
    booster,
    onClose,
    onHire,
    getRegionFlag,
    getRoleIcon
}) {
    return (
        <div className="booster-details-modal-overlay" onClick={onClose}>
            <div className="booster-details-modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="booster-details-modal-header">
                    <h2 className="booster-details-modal-title">Booster Details</h2>
                    <button
                        className="booster-details-close-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>

                <div className="booster-details-modal-content">
                    {/* Booster Header */}
                    <div className="booster-details-header-wrapper">
                        <div
                            className="booster-details-avatar-large"
                            style={{
                                backgroundImage: `url('${booster.avatar || '/backgroundimage.jpg'}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <span className="booster-details-avatar-initial">
                                {booster.name.charAt(0)}
                            </span>
                        </div>
                        <div className="booster-details-info-section">
                            <div className="booster-details-title-wrapper">
                                <h3 className="booster-details-name">{booster.name}</h3>
                                <div className="booster-details-status-container">
                                    <span className="booster-details-rank-badge">{booster.rank}</span>
                                    <span className="booster-details-region-badge">
                                        {getRegionFlag(booster.region)} {booster.region}
                                    </span>
                                    <span className={`booster-details-status-indicator ${booster.online ? 'booster-online' : 'booster-offline'}`}>
                                        {booster.online ? 'Online Now' : 'Currently Offline'}
                                    </span>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="booster-details-stats-grid">
                                <div className="booster-details-stat-item">
                                    <div className="booster-details-stat-label">Win Rate</div>
                                    <div className="booster-details-stat-value booster-win-rate">{booster.winRate}</div>
                                </div>
                                <div className="booster-details-stat-item">
                                    <div className="booster-details-stat-label">Total Games</div>
                                    <div className="booster-details-stat-value">{booster.totalGames.toLocaleString()}</div>
                                </div>
                                <div className="booster-details-stat-item">
                                    <div className="booster-details-stat-label">Hourly Rate</div>
                                    <div className="booster-details-stat-value booster-price-large">{booster.price}</div>
                                </div>
                                <div className="booster-details-stat-item">
                                    <div className="booster-details-stat-label">Rating</div>
                                    <div className="booster-details-rating-display">
                                        <span className="booster-details-stars">
                                            {'★'.repeat(Math.floor(booster.rating))}
                                        </span>
                                        <span className="booster-details-rating-number">{booster.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="booster-details-content-grid">
                        {/* Left Column */}
                        <div className="booster-details-left-column">
                            <div className="booster-details-section-card">
                                <h4 className="booster-details-section-title">
                                    <span className="booster-details-section-icon">🎮</span>
                                    Main Roles
                                </h4>
                                <div className="booster-details-roles-grid">
                                    {booster.role.split('/').map((role, index) => (
                                        <div key={index} className="booster-details-role-card">
                                            <div className="booster-details-role-icon">{getRoleIcon(role)}</div>
                                            <div className="booster-details-role-name">{role}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="booster-details-section-card">
                                <h4 className="booster-details-section-title">
                                    <span className="booster-details-section-icon">🗣️</span>
                                    Languages
                                </h4>
                                <div className="booster-details-languages-list">
                                    {booster.languages.map((lang, index) => (
                                        <span key={index} className="booster-details-language-tag">{lang}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="booster-details-right-column">
                            <div className="booster-details-section-card">
                                <h4 className="booster-details-section-title">
                                    <span className="booster-details-section-icon">⏰</span>
                                    Availability
                                </h4>
                                <div className="booster-details-availability-list">
                                    <div className="booster-details-availability-item">
                                        <div className="booster-details-avail-icon">✅</div>
                                        <div className="booster-details-avail-content">
                                            <div className="booster-details-avail-title">Available for immediate start</div>
                                            <div className="booster-details-avail-desc">Can begin boosting within minutes of hiring</div>
                                        </div>
                                    </div>

                                    <div className="booster-details-availability-item">
                                        <div className="booster-details-avail-icon">✅</div>
                                        <div className="booster-details-avail-content">
                                            <div className="booster-details-avail-title">Solo/Duo queue available</div>
                                            <div className="booster-details-avail-desc">Flexible queue options based on your preference</div>
                                        </div>
                                    </div>
                                    <div className="booster-details-availability-item">
                                        <div className="booster-details-avail-icon">✅</div>
                                        <div className="booster-details-avail-content">
                                            <div className="booster-details-avail-title">Stream available upon request</div>
                                            <div className="booster-details-avail-desc">Watch your games live if requested</div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* Action Buttons */}
                    {/* Have to Implement it */}
                    <div className="booster-details-actions-container">
                        <button
                            className="booster-details-back-btn"
                            onClick={onClose}
                        >
                            <span className="booster-details-btn-icon">←</span>
                            <div className="booster-details-btn-content">
                                <span className="booster-details-btn-main-text">Back to Boosters</span>
                                <span className="booster-details-btn-sub-text">Continue browsing</span>
                            </div>
                        </button>
                        <button
                            className="booster-details-hire-btn"
                            onClick={() => onHire(booster)}
                        >
                            <div className="booster-details-btn-content">
                                <span className="booster-details-btn-main-text">Hire {booster.name}</span>
                                <span className="booster-details-btn-sub-text">Starting at {booster.price}/hour</span>
                            </div>
                            <span className="booster-details-btn-arrow">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}
