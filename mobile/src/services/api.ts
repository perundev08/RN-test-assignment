import { API_BASE_URL, API_TIMEOUT, MOCK_USER_ID } from '../constants';
import {
  PostsResponse,
  FlagResponse,
  FlagErrorResponse,
  FlagReason,
  ApiResponse,
} from '../types';

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408);
    }
    throw error;
  }
};

const handleResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  if (!response.ok) {
    const errorData = isJson
      ? await response.json().catch(() => ({}))
      : { error: await response.text() };

    throw new ApiError(
      errorData.error || `HTTP ${response.status}`,
      response.status,
      errorData
    );
  }

  const data = isJson ? await response.json() : null;
  return { data: data as T };
};

export const apiService = {
  async getPosts(): Promise<PostsResponse> {
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/api/posts`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        API_TIMEOUT
      );

      const result = await handleResponse<PostsResponse>(response);
      return result.data!;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        'Failed to fetch posts. Please check your connection.',
        0,
        error
      );
    }
  },

  async flagPost(
    postId: string,
    reason: FlagReason
  ): Promise<FlagResponse | FlagErrorResponse> {
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/api/posts/${postId}/flag`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: MOCK_USER_ID,
            reason,
          }),
        },
        API_TIMEOUT
      );

      const result = await handleResponse<FlagResponse | FlagErrorResponse>(
        response
      );
      return result.data!;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 409) {
          const errorData = error.data as FlagErrorResponse;
          return errorData;
        }
        throw error;
      }
      throw new ApiError(
        'Failed to flag post. Please check your connection.',
        0,
        error
      );
    }
  },
};

export { ApiError };

