const request = require('request');

module.exports = {
    "getComments": function(ticketNumber, callback) {

    var options = { 
        method: 'GET',
        url: `https://humanbot.zendesk.com/api/v2/tickets/${ticketNumber}/comments.json`,
        headers: { 
            'Content-Type': 'application/json',
        },
        auth:{
            'user': 'wrestlingmania9@gmail.com',
            'pass':'Password@123'
        }
    };
        
    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            callback(null, body);
        }
    });
    }
}