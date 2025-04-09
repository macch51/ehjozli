// src/constants/theme.js
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac6',
    background: '#f6f6f6',
    surface: '#ffffff',
    error: '#B00020',
    text: '#000000',
    onSurface: '#000000',
    disabled: 'rgba(0, 0, 0, 0.26)',
    placeholder: 'rgba(0, 0, 0, 0.54)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#f50057',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
};

// src/constants/config.js
export const API_URL = 'https://api.example.com'; // For future use

export const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/300x200';

export const APP_NAME = 'EventHub';

export const TICKET_STATUSES = {
  VALID: 'valid',
  USED: 'used',
  EXPIRED: 'expired',
  REFUNDED: 'refunded',
};

export const USER_TYPES = {
  CUSTOMER: 'customer',
  ORGANIZER: 'organizer',
  ADMIN: 'admin',
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay',
};