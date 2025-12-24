import { Flag, FlagRequest } from '../types';

class FlagService {
  private flags: Flag[] = [];

  hasUserFlaggedPost(postId: string, userId: string): boolean {
    return this.flags.some(
      (flag) => flag.postId === postId && flag.userId === userId
    );
  }

  getExistingFlag(postId: string, userId: string): Flag | undefined {
    return this.flags.find(
      (flag) => flag.postId === postId && flag.userId === userId
    );
  }

  createFlag(postId: string, request: FlagRequest): Flag {
    const newFlag: Flag = {
      postId,
      userId: request.userId,
      reason: request.reason,
      timestamp: new Date(),
    };

    this.flags.push(newFlag);
    return newFlag;
  }

  getFlagsForPost(postId: string): Flag[] {
    return this.flags.filter((flag) => flag.postId === postId);
  }

  getAllFlags(): Flag[] {
    return [...this.flags];
  }
}

export const flagService = new FlagService();

