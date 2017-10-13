import express, { Router } from 'express';
// Import index action from movies controller
import { index } from './controllers/shops';

// Initialize the router
const router = Router();

// Handle /shops.json route with index action from movies controller
router.route('/shops.json')
  .get(index);

export default router;
