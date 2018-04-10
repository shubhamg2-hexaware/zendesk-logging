// var express = require('express');
// var app = express();
// var zendesk = require('node-zendesk');
// var exampleConfig = require('./config');
// var db = require('./api/db/mysql.js');
// //var fs = require('fs');
// //var zd = require('../lib/client');
// var port = process.env.PORT || 3000;

// var client = zendesk.createClient({
//   username:  exampleConfig.auth.username,
//   token:     exampleConfig.auth.token,
//   remoteUri: exampleConfig.auth.remoteUri
// });

// function listTickets() {
//     client.tickets.list(function (err, statusList, body, responseList, resultList) {
//         if (err) {
//             console.log(err);
//             return;
//         }

//         body.forEach(function(element) {
//             var data = {
//                 ticket_id: element.id,
//                 via_channel: element.via.channel,
//                 priority: element.priority,
//                 status: element.status,
//                 creation_time: element.created_at
//             }
//             var response = db.insertRecord(data, function(response) {
//             });
//         })
//     })
//     setTimeout(listTickets, 60000);
//     console.log("called");
// }

// listTickets();

// app.listen(port);
// console.log("Server running at port " + port);

const request = require('request');

var options = { 
                method: 'GET',
                url: 'https://humanbot.zendesk.com/api/v2/tickets/63/comments.json',
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
            //callback(null,error)
            //console.log(error.message)
            console.log(error);
        } else {
            //callback(body,null);
            console.log(JSON.parse(response.body));
        }
        //console.log(JSON.stringify(body));
        //console.log(JSON.parse(body));
    });
