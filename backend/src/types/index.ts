export interface Post {
  id: string;
  title: string;
  content: string;
}

export interface Flag {
  postId: string;
  userId: string;
  reason: FlagReason;
  timestamp: Date;
}

export type FlagReason = 'Spam' | 'Inappropriate' | 'Harassment' | 'Misinformation' | 'Other';

export interface FlagRequest {
  userId: string;
  reason: FlagReason;
}

export interface ApiError {
  error: string;
  validReasons?: FlagReason[];
  existingFlag?: {
    reason: FlagReason;
    timestamp: Date;
  };
}

