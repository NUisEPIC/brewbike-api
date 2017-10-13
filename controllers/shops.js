import Shop from '../models/shop';

export const index = (req, res, next) => {
  // Find all movies and return json response
  Shop.find().lean().exec((err, shops) => res.json(
    // Iterate through each movie
    { shops: shops.map(shop => ({
      ...shop,
    }))}
  ));
};
