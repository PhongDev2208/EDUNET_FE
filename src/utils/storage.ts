/**
 * Store data in localStorage
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Get data from localStorage
 */
export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 */
export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Clear all localStorage data
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// Storage keys constants
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  RECENT_SEARCHES: 'recent_searches',
  CART_ITEMS: 'cart_items',
  VIEW_MODE: 'view_mode',
} as const;

/**
 * Get user data from storage
 */
export const getUserFromStorage = () => {
  return getLocalStorage(STORAGE_KEYS.USER_DATA, null);
};

/**
 * Set user data in storage
 */
export const setUserInStorage = (user: any): void => {
  setLocalStorage(STORAGE_KEYS.USER_DATA, user);
};

/**
 * Get auth token from storage
 */
export const getAuthToken = (): string | null => {
  return getLocalStorage(STORAGE_KEYS.AUTH_TOKEN, null);
};

/**
 * Set auth token in storage
 */
export const setAuthToken = (token: string): void => {
  setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, token);
};

/**
 * Clear auth data from storage
 */
export const clearAuthData = (): void => {
  removeLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
  removeLocalStorage(STORAGE_KEYS.USER_DATA);
};
