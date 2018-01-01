import Shop from '../models/shop';

const getErrorMessage = (err) => {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				 return err.errors[errName].message;
			}
			else {
				return 'Unknown server error';
			}
		}
	}
}

export const index = (req, res, next) => {
  // Find all shops, return json
  Shop.find().lean().exec((err, shops) => res.json(
    // Iterate through each shop
    { shops: shops.map(shop => ({
      ...shop,
    }))}
  ));
};

export const addShop = (req, res, next) => {
  var myData = new Shop(req.body);
  console.log(myData);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
};

export const getId = (req,res,next) => {
  Shop.findOne({'location':req.params.loc, 'start_time':req.params.start})
  .exec(function(err, articles) {
      if (err) {
          return res.send(400, {
              message: getErrorMessage(err)
          });
      } else {
          res.jsonp(articles._id);
      }
  });
};

export const updateById = (req,res,next) => {
  Shop.update({'_id':req.params.id},{$set: req.body})
    .exec(function(err, articles) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.send('update by id successful');
        }
      });
    };

export const updateByLocTime = (req,res,next) => {
  Shop.update({'start_time':req.params.start, 'location':req.params.loc},{$set: req.body})
    .exec(function(err, articles) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.send('update by id successful');
        }
    });
};

export const deleteById = (req,res,next) => {
  Shop.remove({'_id':req.params.id})
    .exec(function(err, articles) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.send('object successfully deleted');
        }
    });
};

export const getAllLoc = (req,res,next) => {
  Shop.find().distinct('location')
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

exports.getAllByLoc = function(req, res) {
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
