import Activity from '../models/activity';

export const addActivity = (req, res, next) => {
    var myData = new Activity(req.body);
    console.log(myData);
    myData.save()
      .then(item => {
          res.send("activity saved to database");
      })
      .catch(err => {
          res.status(400).send("unable to save to database");
      });
}

export const loadActivities = (req, res, next) => {
    Activity.find().lean()
    .exec((err, activities) => {
        if (err) {
            res.status(400).send("unable to delete");
        } else {
            res.json(activities);
        }
    })
  };

export const clearActivities = (req, res, next) => {
    Activity.remove({})
    .exec((err, articles) => {
        if (err) {
            res.status(400).send("unable to delete");
        } else {
            res.send("activities successfully deleted");
        }
    })
}