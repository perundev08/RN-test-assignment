import { Router, Request, Response } from 'express';
import { postService } from '../services/postService';
import { flagService } from '../services/flagService';
import { validateFlagRequest, isValidPostId } from '../utils/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { FLAG_REASONS } from '../constants';
import { ApiError } from '../types';

const router = Router();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const posts = postService.getAllPosts();
  res.json({ posts });
}));

router.get('/:postId/flags', asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;

  if (!isValidPostId(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  const flags = flagService.getFlagsForPost(postId);
  res.json({ flags });
}));

router.post('/:postId/flag', asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;

  if (!isValidPostId(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  const validation = validateFlagRequest(req.body);
  if (!validation.valid) {
    const error: ApiError = {
      error: validation.error || 'Validation failed',
      ...(validation.error === 'Invalid reason' && { validReasons: FLAG_REASONS }),
    };
    return res.status(400).json(error);
  }

  if (!postService.postExists(postId)) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const existingFlag = flagService.getExistingFlag(postId, validation.data!.userId);
  if (existingFlag) {
    const error: ApiError = {
      error: 'You have already flagged this post',
      existingFlag: {
        reason: existingFlag.reason,
        timestamp: existingFlag.timestamp,
      },
    };
    return res.status(409).json(error);
  }

  const newFlag = flagService.createFlag(postId, validation.data!);
  res.status(201).json({
    message: 'Post flagged successfully',
    flag: newFlag,
  });
}));

export default router;

