var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
server.listen(80);

io.on('connection', function(socket) {
    console.log("user connected");
    socket.emit('connect', "connected");
    setInterval(function() {
        data = "test";
        fs.readFile('./data/data.json', function read(err, data) {
            if (err) {
                throw err;
            }
            var dataToSend;
            try {
                dataToSend = JSON.parse(data);
                socket.emit("sendData", dataToSend);
            } catch (e) {
                try {
                    dataToSend = JSON.parse(data);
                    socket.emit("sendData", dataToSend);
                } catch (e) {
                    console.log("app crashed because of settings file reading. Ignoring read");
                    errorOnRead = true;
                }
            }
        });

    }, 10000);
});

var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var controllers = require('./controllers');

controllers.set(app,fs);


app.use(express.static('public'));

app.get("/", function(req, res) {
    fs.createReadStream("./public/index.html").pipe(res);
});
