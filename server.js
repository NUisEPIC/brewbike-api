import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './router';




// Initialize http server
const app = express();

// Logger that outputs all requests into the console
app.use(morgan('combined'));
// Use v1 as prefix for all API endpoints
app.use('/v1', router);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/shops', function(err){
  const server = app.listen(3000, () => {
    const { address, port } = server.address();
    console.log(`Listening at http://${address}:${port}`);
  });
});
