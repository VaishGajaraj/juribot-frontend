import { apiClient } from './base44Client';

export const analyzeText = (text) => {
  return apiClient.post('/analyze', { text });
};

export const getRules = () => {
  return apiClient.get('/rules');
};