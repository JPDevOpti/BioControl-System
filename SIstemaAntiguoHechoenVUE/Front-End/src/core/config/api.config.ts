export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  VERSION: '/api/v1',
  TIMEOUT: 30000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

export const buildApiUrl = (endpoint: string): string => `${API_CONFIG.BASE_URL}${API_CONFIG.VERSION}${endpoint}`
