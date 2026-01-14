import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } catch (err) {
                console.error('Error parsing stored user:', err);
            }
        }

        setLoading(false);
    }, []);

    const login = async (email, password, rememberMe = false) => {
        setError(null);

        try {
            // Mock API call - replace with your actual login API
            if (email === 'demo@example.com' && password === 'demo123') {
                const mockUser = {
                    id: '1',
                    email: 'demo@example.com',
                    displayName: 'Demo User',
                    createdAt: new Date().toISOString(),
                    favorites: []
                };

                setUser(mockUser);
                setIsAuthenticated(true);

                if (rememberMe) {
                    localStorage.setItem('user', JSON.stringify(mockUser));
                    localStorage.setItem('token', 'mock-jwt-token');
                } else {
                    sessionStorage.setItem('user', JSON.stringify(mockUser));
                    sessionStorage.setItem('token', 'mock-jwt-token');
                }

                return { success: true };
            } else {
                setError('Invalid email or password');
                return { success: false, error: 'Invalid email or password' };
            }
        } catch (err) {
            setError('Login failed. Please try again.');
            return { success: false, error: 'Login failed' };
        }
    };

    const register = async (email, password, displayName) => {
        setError(null);

        try {
            // Mock API call - replace with your actual register API
            if (password.length < 6) {
                setError('Password must be at least 6 characters');
                return { success: false, error: 'Password too short' };
            }

            const newUser = {
                id: Date.now().toString(),
                email,
                displayName: displayName || email.split('@')[0],
                createdAt: new Date().toISOString(),
                favorites: []
            };

            setUser(newUser);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(newUser));
            localStorage.setItem('token', 'mock-jwt-token');

            return { success: true };
        } catch (err) {
            setError('Registration failed. Please try again.');
            return { success: false, error: 'Registration failed' };
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    };

    const updateProfile = async (profileData) => {
        setError(null);

        try {
            const updatedUser = { ...user, ...profileData };
            setUser(updatedUser);

            // Update in storage
            const storageUser = localStorage.getItem('user') || sessionStorage.getItem('user');
            if (storageUser) {
                localStorage.setItem('user', JSON.stringify(updatedUser));
                sessionStorage.setItem('user', JSON.stringify(updatedUser));
            }

            return { success: true };
        } catch (err) {
            setError('Failed to update profile');
            return { success: false, error: 'Update failed' };
        }
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            error,
            login,
            register,
            logout,
            updateProfile,
            clearError
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};