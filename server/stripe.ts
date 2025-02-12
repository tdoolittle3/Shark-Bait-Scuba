import Stripe from 'stripe';

// Check for Stripe secret key in environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error('Warning: STRIPE_SECRET_KEY environment variable is not set.');
  console.error('Stripe functionality will be disabled until the key is provided.');
  throw new Error('Missing required STRIPE_SECRET_KEY environment variable');
}

// Initialize Stripe with the latest API version
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-01-27.acacia',
});