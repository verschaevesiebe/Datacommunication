var mysql = require("../project_modules/mysqlaccess.js");
var conn = mysql.getConnection();
var airapi = require('./airapi.js');

 var serialport = require("./serial.js");
 var socketio= require("./socketio.js");

module.exports.set = function(app,fs){
    airapi.set(app,conn);
    serialport.set(app,conn,fs);
};
