import mongoose, { Schema } from 'mongoose';
import { subscribe } from '../controllers/subscriptions';

var subscriber = new Schema({
    subscribe_time: Date,
    number: Number,
    
});
subscriber.index({number: 1}, {unique: true});
// Export Mongoose model
export default mongoose.model('subscriber', subscriber);