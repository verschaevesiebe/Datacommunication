var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require('fs');
var path = require("path");
var bodyParser = require('body-parser');

var controllers = require('./controllers');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

controllers.set(app);
io.on('connection', function(socket) {
    console.log("user connected");
    socket.emit('connected', "connected");
});
app.use(express.static('public'));

app.get("/", function(req, res) {
    fs.createReadStream("./public/index.html").pipe(res);
});

app.listen(80);
