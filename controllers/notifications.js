import Notification from '../models/notification';
import Subscribe from '../models/subscribe';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export const scheduleNotification = (req, res, next) => {
  


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
