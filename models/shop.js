import mongoose, { Schema } from 'mongoose';
// import Location from './location.js';

// Define movie schema
var shopSchema = new Schema({
  time: {
    type: Date,
    unique: true,
  },
  location: String,
});

// Export Mongoose model
export default mongoose.model('shop', shopSchema);
