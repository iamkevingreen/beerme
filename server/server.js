Meteor.methods({
  sendText: function(obj) {
    check(obj, Object)
    var twilio = Twilio(Meteor.settings.twilio.ACCOUNT_SID, Meteor.settings.twilio.AUTH_TOKEN);
    twilio.sendMessage({

        to:'+1'+obj.number, // Any number Twilio can deliver to
        from: '+16467985534', // A number you bought from Twilio and can use for outbound communication
        body: obj.name+ ' Get me a Beer -Luv '+obj.message+'.' // body of the SMS message

    }, function(err, responseData) { //this function is executed when a response is received from Twilio

        if (!err) { // "err" is an error received during the request, if any

            // "responseData" is a JavaScript object containing data received from Twilio.
            // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
            // http://www.twilio.com/docs/api/rest/sending-sms#example-1

            console.log(responseData.from); // outputs "+14506667788"
            console.log(responseData.body); // outputs "word to your mother."

        }
    });
  }
})
