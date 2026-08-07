import { env } from '../config/env.js';

export const getApiStatus = () => {
  return {
    status: 'OK',
    uptime: Math.round(process.uptime()),
    environment: env.nodeEnv ?? 'development',
    timestamp: new Date().toISOString(),
  };
};
