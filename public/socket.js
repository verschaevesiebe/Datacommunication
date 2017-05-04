/**
 * Created by versc on 4-5-2017.
 */

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
});

function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

var socket = io.connect('http://81.165.234.45');
socket.on('connect', function() {
console.log("connected");
});
socket.on("sendData",function(data){
    $('.progress').animate({ height: '100%' }, 10000);
  console.log(data);
});
