import { Post } from '../types';
import { MOCK_POSTS } from '../constants';

class PostService {
  private posts: Post[] = [...MOCK_POSTS];

  getAllPosts(): Post[] {
    return [...this.posts];
  }

  getPostById(postId: string): Post | undefined {
    return this.posts.find((post) => post.id === postId);
  }

  postExists(postId: string): boolean {
    return this.posts.some((post) => post.id === postId);
  }
}

export const postService = new PostService();

