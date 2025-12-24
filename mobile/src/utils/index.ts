import { Alert } from 'react-native';
import { ApiError } from '../services/api';
import { FlagErrorResponse } from '../types';

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const showErrorAlert = (error: unknown, defaultMessage?: string): void => {
  let message = defaultMessage || 'An unexpected error occurred';

  if (error instanceof ApiError) {
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  Alert.alert('Error', message);
};

export const showSuccessAlert = (title: string, message: string): void => {
  Alert.alert(title, message);
};

export const showFlagError = (error: FlagErrorResponse): void => {
  if (error.existingFlag) {
    Alert.alert(
      'Already Flagged',
      `You have already flagged this post as "${error.existingFlag.reason}".`
    );
  } else {
    Alert.alert('Error', error.error || 'Failed to flag post');
  }
};

