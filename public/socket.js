/**
 * Created by versc on 4-5-2017.
 */

var socket = io.connect('http://81.165.234.45');
socket.on('connect', function() {
console.log("connected");
});