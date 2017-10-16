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


exports.listWithParams = function(req, res) {
    Shop.find()
    .where('location')
    .equals(req.params.param1)
    .exec(function(err, articles) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(articles);
        }
    });
};
