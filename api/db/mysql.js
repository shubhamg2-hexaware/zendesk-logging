var mysql = require('mysql');
var processor = require('../src/module.js');
require('dotenv').config()
//var logger = require('../logger.js');

var db_config = {
            host     : process.env.SQL_HOST, 
            user     : process.env.SQL_USER, 
            password : process.env.SQL_PASS, 
            database : process.env.SQL_DBNAME 
        }
var connection = mysql.createConnection(db_config);

function handleDisconnect() {
	connection.destroy();
	connection = mysql.createConnection(db_config);
	connection.connect(function(err) {
	    if(err) {
			setTimeout(handleDisconnect, 1000);
	    } else {
            console.log("connected");
        } 
        connection.on('error', function(err) {
            console.log(err.code); // 'ER_BAD_DB_ERROR'
            setTimeout(handleDisconnect, 1000);
        });
	});
}//Method to handle MySQL server disconnection.


connection.connect(function(err) {
  if (err) {
    //logger.error("CONNECTION ERROR", err);
    setTimeout(handleDisconnect, 2000);
  } else {
    console.log('You are now connected...');
  }
})//Database connection.

connection.on('error', function(err) {
  //logger.error("DB ERROR, connection lost", err);
  console.log(err.code);// 'ER_BAD_DB_ERROR'
  setTimeout(handleDisconnect, 1000)
});//Method which won't allow to close node server even after MySQL server disconnects.

module.exports = {
    "insertRecord" : function (data, callback) {
        connection.query('insert into ticket_log set ?', data, function(err, rows, fields) {
            if (err) {
                var response = processor.dbErrorResponse();
                return callback(response);
            }
            var message = "ticket details are inserted.";
            var response = processor.getResponse(rows, message);
            return callback(response);
        
        });
    }
}