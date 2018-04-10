var express = require('express');
var app = express();
var zendesk = require('node-zendesk');
var exampleConfig = require('./config');
var db = require('./api/db/mysql.js');
var chatComments = require('./api/src/chat');
var deasync = require('deasync');
//var fs = require('fs');
//var zd = require('../lib/client');
var port = process.env.PORT || 3000;

var client = zendesk.createClient({
  username:  exampleConfig.auth.username,
  token:     exampleConfig.auth.token,
  remoteUri: exampleConfig.auth.remoteUri
});

function listTickets() {
    client.tickets.list(function (err, statusList, body, responseList, resultList) {
        if (err) {
            console.log(err);
            return;
        }

        body.forEach(function(element) {
            if(element.via.channel == 'facebook') {
                let commentResponse = deasync(function(callback) {
                    chatComments.getComments(element.id, callback);
                })();
                console.log(JSON.parse(commentResponse));
                commentResponse.comments.forEach(function(element2){
                    console.log(element2.plain_body);
                });
                var data = {
                    ticket_id: element.id,
                    via_channel: element.via.channel,
                    priority: element.priority,
                    status: element.status,
                    creation_time: element.created_at
                }
                var response = db.insertRecord(data, function(response) {
                });
            }
        })
    })
    // setTimeout(listTickets, 60000);
    // console.log("called");
}

listTickets();

app.listen(port);
console.log("Server running at port " + port);
