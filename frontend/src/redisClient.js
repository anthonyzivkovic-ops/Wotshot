import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: 'https://your-database-id.upstash.io',
  token: 'your-secret-token-here',
});
