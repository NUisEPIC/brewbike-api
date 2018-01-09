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