import express, { Router } from 'express';



// Import index action from movies controller
import { index, getAllLoc, getAllByLoc, addShop, getId, updateById, updateByLocTime, deleteById } from './controllers/shops';
import {subscribe} from './controllers/subscriptions';
import {notifySubscribers, getNotifications} from './controllers/notifications';
import {addActivity, loadActivities, clearActivities} from './controllers/activities';

// Initialize the router
const router = Router();

// Handle /shops.json route with index action from movies controller
router.route('/shops.json')
  .get(index);

router.get('/', function (req, res) {
  res.send('HOME PAGE');
});

// route to get ALL locations (distinct)
router.route('/shops/locations')
    .get(getAllLoc);

// get all the objects by a particular location
router.route('/shops/:param1')
    .get(getAllByLoc);

// req body must include a shop json object to add
router.route('/addshop').post(addShop);

// get id of object w/ location & start time given
router.route('/shops/:loc/:start').get(getId);

// update an object by id (updated time & location must be in req)
router.route('/shops/:id').put(updateById);

// update by location time
router.route('/shops/:loc/:start').put(updateByLocTime);

// delete an object using its ID
router.route('/shops/:id').delete(deleteById)

// subscribe a phone number to notifications - twilio functionality
router.route('/subscribe').post(subscribe);

// notify all phone numbers via text with given notification + add it to db
router.route('/notify').post(notifySubscribers)

// get notifications. If queryString is given parameter ?limit=X where X is an int, will return the latest X notifications sent
router.route('/notifications').get(getNotifications);

// add a new activity to display at the activities section
router.route('/addactivity').post(addActivity);

router.route('/loadactivities').get(loadActivities);

router.route('/clearactivities').delete(clearActivities);

export default router;
