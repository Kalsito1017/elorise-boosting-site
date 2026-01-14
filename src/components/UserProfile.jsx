import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
    const { user, logout, updateProfile } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [isSaving, setIsSaving] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const fileInputRef = useRef(null);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setIsEditing(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    const handleSave = async () => {
        setIsSaving(true);
        await updateProfile({ displayName, avatar: avatarPreview });
        setIsSaving(false);
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };

    const getInitials = () => {
        if (user.displayName) {
            return user.displayName
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        }
        return user.email.slice(0, 2).toUpperCase();
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Image size should be less than 2MB');
            return;
        }

        setIsUploadingAvatar(true);

        try {
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setAvatarPreview(base64String);
                setIsUploadingAvatar(false);

                // Auto-save the avatar
                updateProfile({ avatar: base64String });
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('Failed to upload avatar. Please try again.');
            setIsUploadingAvatar(false);
        }
    };

    const removeAvatar = () => {
        setAvatarPreview(null);
        updateProfile({ avatar: null });
    };

    // Get avatar URL - either from preview or user data
    const getAvatarUrl = () => {
        return avatarPreview || user.avatar;
    };

    return (
        <div className="user-profile" ref={dropdownRef}>
            <button
                className="profile-toggle"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
            >
                <div className="avatar">
                    {getAvatarUrl() ? (
                        <img
                            src={getAvatarUrl()}
                            alt={user.displayName || user.email}
                            className="avatar-img"
                        />
                    ) : (
                        getInitials()
                    )}
                </div>
                <span className="user-name">{user.displayName || user.email}</span>
                <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span>
            </button>

            {isDropdownOpen && (
                <div className="profile-dropdown">
                    <div className="dropdown-header">
                        <div className="avatar-section">
                            <div
                                className="dropdown-avatar"
                                onClick={handleAvatarClick}
                                title="Change avatar"
                            >
                                {getAvatarUrl() ? (
                                    <img
                                        src={getAvatarUrl()}
                                        alt={user.displayName || user.email}
                                        className="avatar-img"
                                    />
                                ) : (
                                    getInitials()
                                )}
                                <div className="avatar-overlay">
                                    <span className="camera-icon">📷</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                accept="image/*"
                                className="avatar-input"
                                style={{ display: 'none' }}
                            />
                            {isUploadingAvatar && (
                                <div className="avatar-uploading">
                                    <div className="spinner-small"></div>
                                </div>
                            )}
                            {getAvatarUrl() && (
                                <button
                                    className="remove-avatar-btn"
                                    onClick={removeAvatar}
                                    title="Remove avatar"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                        <div className="dropdown-user-info">
                            <div className="dropdown-name">{user.displayName || user.email}</div>
                            <div className="dropdown-email">{user.email}</div>
                            <div className="member-since">
                                Member since {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <div className="dropdown-section">
                        <h4>Account</h4>
                        {isEditing ? (
                            <div className="edit-form">
                                <div className="form-group">
                                    <label>Display Name</label>
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Enter display name"
                                    />
                                </div>
                                <div className="form-actions">
                                    <button
                                        className="btn-save"
                                        onClick={handleSave}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        className="btn-cancel"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setDisplayName(user.displayName || '');
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                className="dropdown-item"
                                onClick={() => setIsEditing(true)}
                            >
                                <span className="item-icon">👤</span>
                                Edit Profile
                            </button>
                        )}

                        <button className="dropdown-item" onClick={handleAvatarClick}>
                            <span className="item-icon">🖼️</span>
                            Change Avatar
                        </button>

                        <button className="dropdown-item">
                            <span className="item-icon">⚙️</span>
                            Settings
                        </button>
                    </div>


                    <div className="dropdown-footer">
                        <button className="logout-btn" onClick={handleLogout}>
                            <span className="logout-icon">🚪</span>
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}