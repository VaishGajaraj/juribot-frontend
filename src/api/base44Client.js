import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "686536bdb794ffe3b7b49593", 
  requiresAuth: true // Ensure authentication is required for all operations
});
