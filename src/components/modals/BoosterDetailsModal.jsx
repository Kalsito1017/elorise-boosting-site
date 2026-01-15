

export default function BoosterDetailsModal({
    booster,
    onClose,
    onHire,
    getRegionFlag,
    getRoleIcon
}) {
    return (
        <div className="modal-overlay boosters-modal-overla" onClick={onClose}>
            <div className="booster-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header boosters-modal-header">
                    <h2>Booster Details</h2>
                    <button className="close-btn booster-close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-content">
                    <div className="modal-booster-header-wide">
                        <div
                            className="modal-avatar-large"
                            style={{
                                backgroundImage: `url('${booster.avatar || '/backgroundimage.jpg'}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <span style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                fontSize: '2.5rem',
                                fontWeight: 'bold'
                            }}>
                                {booster.name.charAt(0)}
                            </span>
                        </div>
                        <div className="modal-booster-info-wide">
                            <div className="booster-title-section">
                                <h3>{booster.name}</h3>
                                <div className="booster-status-display">
                                    <span className="rank-badge-large">{booster.rank}</span>
                                    <span className="region-badge-large">
                                        {getRegionFlag(booster.region)} {booster.region}
                                    </span>
                                    <span className={`status-indicator-large ${booster.online ? 'online' : 'offline'}`}>
                                        {booster.online ? 'Online Now' : 'Currently Offline'}
                                    </span>
                                </div>
                            </div>

                            <div className="header-stats-grid">
                                <div className="header-stat">
                                    <div className="header-stat-label">Win Rate</div>
                                    <div className="header-stat-value highlight">{booster.winRate}</div>
                                </div>
                                <div className="header-stat">
                                    <div className="header-stat-label">Total Games</div>
                                    <div className="header-stat-value">{booster.totalGames.toLocaleString()}</div>
                                </div>
                                <div className="header-stat">
                                    <div className="header-stat-label">Hourly Rate</div>
                                    <div className="header-stat-value price-large">{booster.price}</div>
                                </div>
                                <div className="header-stat">
                                    <div className="header-stat-label">Rating</div>
                                    <div className="header-stat-value">
                                        <span className="rating-large">
                                            {'★'.repeat(Math.floor(booster.rating))}
                                        </span>
                                        <span className="rating-number-large">{booster.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-content-grid">
                        <div className="modal-left-column">
                            <div className="detail-section-full">
                                <h4 className="section-title-with-icon">
                                    <span className="section-icon">🎮</span>
                                    Main Roles
                                </h4>
                                <div className="roles-display-grid">
                                    {booster.role.split('/').map((role, index) => (
                                        <div key={index} className="role-card">
                                            <div className="role-icon-large">{getRoleIcon(role)}</div>
                                            <div className="role-name-large">{role}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-section-full">
                                <h4 className="section-title-with-icon">
                                    <span className="section-icon">🗣️</span>
                                    Languages
                                </h4>
                                <div className="languages-grid">
                                    {booster.languages.map((lang, index) => (
                                        <span key={index} className="language-pill-large">{lang}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal-right-column">
                            <div className="detail-section-full">
                                <h4 className="section-title-with-icon">
                                    <span className="section-icon">⏰</span>
                                    Availability
                                </h4>
                                <div className="availability-grid">
                                    <div className="availability-item">
                                        <div className="avail-icon">✅</div>
                                        <div className="avail-content">
                                            <div className="avail-title">Available for immediate start</div>
                                            <div className="avail-desc">Can begin boosting within minutes of hiring</div>
                                        </div>
                                    </div>
                                    <div className="availability-item">
                                        <div className="avail-icon">✅</div>
                                        <div className="avail-content">
                                            <div className="avail-title">24/7 customer support</div>
                                            <div className="avail-desc">Round-the-clock communication available</div>
                                        </div>
                                    </div>
                                    <div className="availability-item">
                                        <div className="avail-icon">✅</div>
                                        <div className="avail-content">
                                            <div className="avail-title">Solo/Duo queue available</div>
                                            <div className="avail-desc">Flexible queue options based on your preference</div>
                                        </div>
                                    </div>
                                    <div className="availability-item">
                                        <div className="avail-icon">✅</div>
                                        <div className="avail-content">
                                            <div className="avail-title">Stream available upon request</div>
                                            <div className="avail-desc">Watch your games live if requested</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section-full">
                                <h4 className="section-title-with-icon">
                                    <span className="section-icon">📝</span>
                                    About This Booster
                                </h4>
                                <div className="booster-description-full">
                                    <p>
                                        Professional League of Legends player with extensive experience in competitive boosting.
                                        Specializes in {booster.role.toLowerCase()} roles with consistent high performance.
                                    </p>
                                    <p>
                                        Known for quick completion times and excellent communication. Has helped numerous
                                        clients achieve their desired ranks with exceptional win rates.
                                    </p>
                                    <p className="additional-info">
                                        ✅ Verified Booster • 🔒 Secure Account Handling • ⚡ Fast Delivery
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions-full">
                        <button
                            className="action-btn-full back-btn-full"
                            onClick={onClose}
                        >
                            <span className="btn-icon-large">←</span>
                            <div className="btn-text-container">
                                <span className="btn-main-text">Back to Boosters</span>
                                <span className="btn-sub-text">Continue browsing</span>
                            </div>
                        </button>
                        <button
                            className="action-btn-full hire-btn-full"
                            onClick={() => onHire(booster)}
                        >
                            <div className="btn-text-container">
                                <span className="btn-main-text">Hire {booster.name}</span>
                                <span className="btn-sub-text">Starting at {booster.price}/hour</span>
                            </div>
                            <span className="btn-arrow">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}