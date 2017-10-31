import mongoose, { Schema } from 'mongoose';
// import Location from './location.js';

// Define movie schema
var shopSchema = new Schema({
  start_time: Date,
  end_time: Date,
  location: String,
});

// Export Mongoose model
export default mongoose.model('shop', shopSchema);
