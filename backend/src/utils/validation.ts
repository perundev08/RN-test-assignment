import { FlagRequest, FlagReason } from '../types';
import { FLAG_REASONS } from '../constants';

export const validateFlagRequest = (
  body: unknown
): { valid: boolean; data?: FlagRequest; error?: string } => {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body is required' };
  }

  const request = body as Partial<FlagRequest>;

  if (!request.userId || typeof request.userId !== 'string' || request.userId.trim() === '') {
    return { valid: false, error: 'userId is required and must be a non-empty string' };
  }

  if (!request.reason || typeof request.reason !== 'string') {
    return { valid: false, error: 'reason is required and must be a string' };
  }

  if (!FLAG_REASONS.includes(request.reason as FlagReason)) {
    return {
      valid: false,
      error: 'Invalid reason',
    };
  }

  return {
    valid: true,
    data: {
      userId: request.userId.trim(),
      reason: request.reason as FlagReason,
    },
  };
};

export const isValidPostId = (postId: string): boolean => {
  return typeof postId === 'string' && postId.trim() !== '';
};

