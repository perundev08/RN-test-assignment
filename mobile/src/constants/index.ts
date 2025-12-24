import { Platform } from 'react-native';
import { FlagReason } from '../types';

export const FLAG_REASONS: FlagReason[] = [
  'Spam',
  'Inappropriate',
  'Harassment',
  'Misinformation',
  'Other',
];

export const FLAG_REASON_LABELS: Record<FlagReason, string> = {
  Spam: 'Spam',
  Inappropriate: 'Inappropriate Content',
  Harassment: 'Harassment',
  Misinformation: 'Misinformation',
  Other: 'Other',
};

export const FLAG_REASON_ICONS: Record<FlagReason, string> = {
  Spam: '🚫',
  Inappropriate: '⚠️',
  Harassment: '🚨',
  Misinformation: '❌',
  Other: '📝',
};

export const getApiBaseUrl = (): string => {
  if (!__DEV__) {
    return process.env.API_URL || 'https://your-production-api.com';
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  }

  return 'http://localhost:3000';
};

export const API_BASE_URL = getApiBaseUrl();

export const MOCK_USER_ID = 'user-123';

export const API_TIMEOUT = 10000;

