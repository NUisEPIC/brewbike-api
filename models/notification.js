import mongoose, { Schema } from 'mongoose';

var notification = new Schema({
    notify_time: Date,
    text: String,
    user: String
});

export default mongoose.model('notification', notification);