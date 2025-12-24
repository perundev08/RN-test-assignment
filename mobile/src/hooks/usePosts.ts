import { useState, useEffect, useCallback } from 'react';
import { Post, FlagReason } from '../types';
import { apiService } from '../services/api';
import { showErrorAlert, showSuccessAlert, showFlagError } from '../utils';
import { ApiError } from '../services/api';
import { FlagErrorResponse } from '../types';

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  flaggingPostId: string | null;
  refreshPosts: () => Promise<void>;
  flagPost: (postId: string, reason: FlagReason) => Promise<void>;
}

export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flaggingPostId, setFlaggingPostId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getPosts();
      setPosts(response.posts || []);
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.message
          : 'Failed to load posts. Please check if the backend is running.';
      setError(errorMessage);
      showErrorAlert(err, errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const flagPost = useCallback(
    async (postId: string, reason: FlagReason) => {
      setFlaggingPostId(postId);
      try {
        const response = await apiService.flagPost(postId, reason);

        if ('error' in response) {
          showFlagError(response as FlagErrorResponse);
        } else {
          showSuccessAlert(
            'Success',
            `Post flagged as "${reason}" successfully.`
          );
        }
      } catch (err) {
        showErrorAlert(
          err,
          'Failed to flag post. Please check your connection.'
        );
      } finally {
        setFlaggingPostId(null);
      }
    },
    []
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    flaggingPostId,
    refreshPosts: fetchPosts,
    flagPost,
  };
};

