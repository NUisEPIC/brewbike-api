import Subscribe from '../models/subscribe';

const MessagingResponse = require('twilio').twiml.MessagingResponse;

// TODO - check if this works

export const subscribe = (req, res, next) => {
    // add code to add phone number in database here
    const twiml = new MessagingResponse();
    console.log(req.body); // debugging statement

    var text = req.body.Body.trim().toLowerCase();
    var phoneNumber = parseInt(req.body.From);
    if (text === 'subscribe') {
        var subscriber = new Subscribe({
            subscribe_time: new Date(),
            number: phoneNumber // phone number message was sent from
        });
        subscriber.save()
        .then(item => {
            res.send("Subscriber saved to database");
        })
        .catch(err => {
            console.error(err);
            res.status(400).send("unable to save subscriber to database");
        });
    }
    else if (text === 'unsub') {
        Subscribe.remove({number: phoneNumber})
        .exec( (err, articles) => {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.send('Subscriber successfully deleted');
            }
        })
    }
    else { // dont do anything if it isn't either of the two
        return
    }

    twiml.message("Thanks for opting-in for text notifications from BrewBike! We won't bother you with un-necessary stuff. We'll only message you with our daily shop timings, unexpected changes to our schedule and the occasional promotion. Not buying it? Reply with 'unsub' to unsubscribe from notifications. Have a great day!");
    
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
}


export const notify = (req, res, next) => {
    // add code for notification blast function here
}