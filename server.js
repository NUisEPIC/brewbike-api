import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './router';


// Initialize http server
const app = express();

var bodyParser = require('body-parser');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logger that outputs all requests into the console
app.use(morgan('combined'));
// Use v1 as prefix for all API endpoints
app.use('/v1', router);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/brewbike', function(err){
  const server = app.listen(2000, () => {
    const { address, port } = server.address();
    console.log(`Listening at http://${address}:${port}`);
  });
});
