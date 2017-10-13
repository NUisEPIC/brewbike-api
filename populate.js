import mongoose from 'mongoose';
import Shop from './models/shop';

const shops = [
  {
    time: new Date(),
    location: "hinman",
  },
  {
      time: new Date(),
      location: "somewhere",
    },
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost/shops', function(err) {
  // Go through each movie
  shops.map(data => {
    // Initialize a model with movie data
    const shop = new Shop(data);
    // and save it into the database
    shop.save();
  });
});
