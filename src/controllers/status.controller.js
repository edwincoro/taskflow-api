import { successResponse } from '../utils/response.js';
import { getApiStatus } from '../services/status.service.js';

export const getStatus = (req, res) => {
  const status = getApiStatus();
  return successResponse(res, status, 'API en funcionamiento');
};
