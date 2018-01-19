import Notification from '../models/notification';
import Subscribe from '../models/subscribe';
import Inqueue from '../models/inqueue';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
var CronJob = require('cron').CronJob;

// the local hashTable (dict)  that stores the notification id with the corresponding job object
let jobs = {}

// TODO - function called to send the notification blast at the scheduled time, by the scheduler, aka. chron or node-schedule
// called by the scheduleNotification function
const notifyViaCron = (message) => {

    Subscribe.find( (err, subscribers) => {
      console.log(subscribers) // debugging statement

      for (var i = 0; i < subscribers.length; i++) { // iterating through all notifications in db
          client.messages.create({ // sending notification message to number
              body: message,
              to: parseInt(subscribers[i].number),
              from: '+15735754617' // our twilio number
          })
          .then((message) => process.stdout.write(message.sid));
      }
  })
  .then(
      res.send(`Sent out notification blast to all numbers.`)

  )
  .catch( (err) => {
      console.error(err);
      res.status(400).send("Notification blast failed.");
  });
  // Remove from Inqueue add to notifications
}

// TODO - function to schedule a notification - post request data will be in req.body
export const scheduleNotification = (req, res, next) => {
    var note = new Inqueue({
        notify_time: req.body.notify_time,
        text: req.body.text,
        user: req.body.user
    });

    let jobId;
    note.save( (err, notification) => {
        jobId = notification._id;
    }); // saving notification to db and id

    // Creating CronJob
    // var job = new CronJob(req.body.notify_time, notifyViaCron.bind(this, req.body.text))

    // console.log(req.body.notify_time);

    var job = new CronJob(new Date(req.body.notify_time), () => {

        Subscribe.find( (err, subscribers) => {
          console.log(subscribers) // debugging statement
    
          for (var i = 0; i < subscribers.length; i++) { // iterating through all notifications in db
              client.messages.create({ // sending notification message to number
                  body: req.body.text,
                  to: parseInt(subscribers[i].number),
                  from: '+15735754617' // our twilio number
              })
              .then((message) => process.stdout.write(message.sid));
          }
      })
      .then( () => {  
        Inqueue.remove({'_id':jobId})
        .exec(function(err, articles) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                console.log('object successfully deleted');
            }
        })
        // Remove job from dictionary
        delete jobs[jobId]
        res.send(`Sent out notification blast to all numbers.`)
      })
      .catch( (err) => {
          console.error(err);
          res.status(400).send("Notification blast failed.");
      });
      
      // Remove from Inqueue add to notifications
    });

    // Saving a local copy of the job in jobs dict
    jobs[jobId] = job;

    job.start();
    // console.log("Job status:"+job.running());
}

// TODO - function to delete a scheduled notfiication - its a delete request, but you will need the notification _id. so it will be given to you as a route param.
// can access the _id by req.params.id
export const deleteNotification = (req, res, next) => {
    jobs[jobId].stop();
    //remove from inqueue database
    Inqueue.remove({'_id':req.params.id})
      .exec(function(err, articles) {
          if (err) {
              return res.send(400, {
                  message: getErrorMessage(err)
              });
          } else {
              res.send('object successfully deleted');
          }
      });
    // Remove job from dictionary
    delete jobs[jobId]
}

// TODO - function to get all scheduled notifications - get request
export const getScheduledNotifications = (req, res, next) => {
  if (req.query.limit === undefined) { // if the optional query cparameter 'limit' is not given
      Inqueue.find().sort('-notify_time')
      .lean().exec( (err, notifications) => {
          if (err) {
              console.error(err);
              res.status(500).send("Failure to get notifications.");
          }
          else {
              res.end(JSON.stringify(notifications));
          }
      });
  }
  else {
      Inqueue.find().sort('-notify_time')
      .limit(parseInt(req.query.limit))
      .lean().exec( (err, notifications) => {
          if (err) {
              console.error(err);
              res.status(500).send("Failure to get notifications.");
          }
          else {
              res.end(JSON.stringify(notifications));
          }
      });
  }
}

// TODO - function to get a scheduled notification by _id
export const getScheduledNotificationById = (req, res, next) => {
  Inqueue.findOne({'_id':req.params.id})
  .exec(function(err, articles) {
      if (err) {
          return res.send(400, {
              message: getErrorMessage(err)
          });
      } else {
          res.jsonp(articles._id); // WHAT IS THIS?
      }
  });
}

// TODO - function to update a scheduled notification before its sent
export const updateScheduledNotification = (req, res, next) => {
  Inqueue.update({'_id':req.params.id},{$set: req.body})
    .exec(function(err, articles) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.send('update by id successful');
        }
      });
}


// to blast notification to all phone_numbers in subscribers collection
export const notifySubscribers = (req, res, next) => {
    console.log(req.params) // debugging statement
    console.log(req.body) // debugging statement

    var note = new Notification({
        notify_time: new Date(),
        text: req.body.text,
        user: req.body.user
    });

    note.save(); // saving notification to db

      Subscribe.find( (err, subscribers) => {
        console.log(subscribers) // debugging statement

        for (var i = 0; i < subscribers.length; i++) { // iterating through all notifications in db
            client.messages.create({ // sending notification message to number
                body: req.body.text,
                to: parseInt(subscribers[i].number),
                from: '+15735754617' // our twilio number
            })
            .then((message) => process.stdout.write(message.sid));
        }
    })
    .then(
        res.send(`Sent out notification blast to all numbers.`)
    )
    .catch( (err) => {
        console.error(err);
        res.status(400).send("Notification blast failed.");
    });

}

// to get all notifications previously sent
export const getNotifications = (req, res, next) => {
    if (req.query.limit === undefined) { // if the optional query cparameter 'limit' is not given
        Notification.find().sort('-notify_time')
        .lean().exec( (err, notifications) => {
            if (err) {
                console.error(err);
                res.status(500).send("Failure to get notifications.");
            }
            else {
                res.end(JSON.stringify(notifications));
            }
        });
    }
    else {
        Notification.find().sort('-notify_time')
        .limit(parseInt(req.query.limit))
        .lean().exec( (err, notifications) => {
            if (err) {
                console.error(err);
                res.status(500).send("Failure to get notifications.");
            }
            else {
                res.end(JSON.stringify(notifications));
            }
        });
    }

}
