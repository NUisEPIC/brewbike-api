import express, { Router } from 'express';



// Import index action from movies controller
import { index, getAllLoc, getAllByLoc, addShop, getId, updateById, updateByLocTime, deleteById } from './controllers/shops';
import {subscribe} from './controllers/subscriptions';
import {getScheduledNotifications, getScheduledNotificationById, deleteNotification, updateScheduledNotification, scheduleNotification, notifySubscribers, getNotifications} from './controllers/notifications';

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

// Notify all phone numbers via text with given notification at a specific time + add it to db
router.route('/notify/schedule').post(scheduleNotification)

// get notifications. If queryString is given parameter ?limit=X where X is an int, will return the latest X notifications sent
router.route('/notifications').get(getNotifications);

// route to schedule notifications for future - TODO
router.route('/notify/schedule').post(scheduleNotification);

// route to delete a scheduled notification - TODO
router.route('/notify/schedule/:id').delete(deleteNotification);

// route to get all scheduled notifications from the db - TODO
router.route('/notify/schedule').get(getScheduledNotifications);

// route to get a particular scheduled notification by id - TODO
router.route('/notify/schedule/:id').get(getScheduledNotificationById);

// route to update a particular scheduled notification before it is sent - TODO
router.route('/notify/schedule/:id').put(updateScheduledNotification);

export default router;
