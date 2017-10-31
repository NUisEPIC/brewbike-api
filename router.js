import express, { Router } from 'express';
// Import index action from movies controller
import { index, getAllByLoc, addShop, getId, updateById, updateByLocTime, deleteById } from './controllers/shops';

// Initialize the router
const router = Router();

// Handle /shops.json route with index action from movies controller
router.route('/shops.json')
  .get(index);

router.get('/', function (req, res) {
  res.send('HOME PAGE');
});

router.route('/shops/:param1')
    .get(getAllByLoc);

router.route('/addshop').post(addShop);

router.route('/shops/:loc/:start').get(getId);

router.route('/shops/:id').put(updateById);

router.route('/shops/:loc/:start').put(updateByLocTime);

router.route('/shops/:id').delete(deleteById)

export default router;
