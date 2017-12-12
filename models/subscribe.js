import mongoose, { Schema } from 'mongoose';
import { subscribe } from '../controllers/subscriptions';

var subscriber = new Schema({
    subscribe_time: Date,
    number: Number,
    
});
subscriber.index({number: 1}, {unique: true}); // making the number an index so that mongoDB ensures uniqueness in values
// Export Mongoose model
export default mongoose.model('subscriber', subscriber);