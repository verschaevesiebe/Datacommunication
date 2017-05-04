/**
 * Created by versc on 4-5-2017.
 */

var socket = io();
socket.on('connect', function() {
    document.getElementById("socketio").innerHTML = "socket connected";
});