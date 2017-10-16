import express, { Router } from 'express';
// Import index action from movies controller
import { index, listWithParams } from './controllers/shops';

// Initialize the router
const router = Router();

// Handle /shops.json route with index action from movies controller
router.route('/shops.json')
  .get(index);

router.get('/', function (req, res) {
  res.send('HOME PAGE');
});

router.route('/shops/:param1')
    .get(listWithParams);

export default router;
