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

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PostsResponse {
  posts: Post[];
}

export interface FlagResponse {
  message: string;
  flag: Flag;
}

export interface FlagErrorResponse {
  error: string;
  existingFlag?: {
    reason: FlagReason;
    timestamp: Date;
  };
  validReasons?: FlagReason[];
}

