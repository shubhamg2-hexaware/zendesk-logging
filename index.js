var zendesk = require('node-zendesk');
var exampleConfig = require('./config');
//var fs = require('fs');
//var zd = require('../lib/client');

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
            console.log(element.id);
        })
    })
}

listTickets();
