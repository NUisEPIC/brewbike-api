import mongoose, { Schema } from 'mongoose';

var activitySchema = new Schema({
  description: String,
  time: Date,
  person: String,
});

export default mongoose.model('activity', activitySchema);
