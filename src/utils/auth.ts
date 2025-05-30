import { useState, useEffect } from 'react';

const MAX_LOGIN_ATTEMPTS = 3;
const BLOCK_DURATION = 3 * 60 * 1000; // 3 minutes in milliseconds

interface AuthState {
  attempts: number;
  blockedUntil: number | null;
}

const getAuthState = (): AuthState => {
  const stored = localStorage.getItem('auth_state');
  return stored ? JSON.parse(stored) : { attempts: 0, blockedUntil: null };
};

const saveAuthState = (state: AuthState) => {
  localStorage.setItem('auth_state', JSON.stringify(state));
};

const clearAuthState = () => {
  localStorage.removeItem('auth_state');
  localStorage.removeItem('auth_token');
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  });
  const [authError, setAuthError] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    const authState = getAuthState();
    const now = Date.now();

    // Check if user is blocked
    if (authState.blockedUntil && now < authState.blockedUntil) {
      const remainingSeconds = Math.ceil((authState.blockedUntil - now) / 1000);
      setAuthError(`Too many login attempts. Please try again in ${remainingSeconds} seconds.`);
      return false;
    }

    // Reset attempts if block duration has passed
    if (authState.blockedUntil && now >= authState.blockedUntil) {
      authState.attempts = 0;
      authState.blockedUntil = null;
    }

    // Validate credentials
    if (email !== 'admin@adlytica.com' || password !== 'Adlytica') {
      authState.attempts += 1;
      
      if (authState.attempts >= MAX_LOGIN_ATTEMPTS) {
        authState.blockedUntil = now + BLOCK_DURATION;
        setAuthError(`Too many login attempts. Please try again in 3 minutes.`);
      } else {
        const remainingAttempts = MAX_LOGIN_ATTEMPTS - authState.attempts;
        setAuthError(`Invalid credentials. ${remainingAttempts} attempts remaining.`);
      }
      
      saveAuthState(authState);
      return false;
    }

    // Successful login
    const token = btoa(`${email}:${now}`);
    localStorage.setItem('auth_token', token);
    saveAuthState({ attempts: 0, blockedUntil: null });
    setIsAuthenticated(true);
    setAuthError(null);
    return true;
  };

  const logout = () => {
    clearAuthState();
    setIsAuthenticated(false);
    setAuthError(null);
  };

  return { isAuthenticated, login, logout, authError };
};