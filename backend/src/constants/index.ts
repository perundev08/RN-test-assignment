import { FlagReason } from '../types';

export const FLAG_REASONS: FlagReason[] = [
  'Spam',
  'Inappropriate',
  'Harassment',
  'Misinformation',
  'Other',
];

export const MOCK_POSTS = [
  {
    id: '1',
    title: 'Welcome to the Community',
    content: 'This is our first post! We are excited to have you here.',
  },
  {
    id: '2',
    title: 'Important Announcement',
    content: 'Please read this carefully. We have some important updates.',
  },
  {
    id: '3',
    title: 'New Feature Released',
    content: 'Check out our latest update! We have added many new features.',
  },
  {
    id: '4',
    title: 'Community Guidelines',
    content: 'Please follow our rules. They help maintain a positive environment.',
  },
  {
    id: '5',
    title: 'Weekly Update',
    content: 'Here is what happened this week. Stay tuned for more updates!',
  },
];

export const DEFAULT_PORT = 3000;

