import mongoose, { Schema } from 'mongoose';

var inqueue = new Schema({
    notify_time: Date,
    text: String,
    user: String
});

export default mongoose.model('inqueue', inqueue);
