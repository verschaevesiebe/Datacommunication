/**
 * Created by versc on 4-5-2017.
 */

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
});

function myMap(lat , lng) {
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        title: 'Hello World!'
    });

    marker.setMap(map);
}

var socket = io.connect('http://81.165.234.45');
socket.on('connect', function() {
console.log("connected");
});



socket.on("sendData",function(data){
  document.getElementById("air").style="height:"+ data[0].Airquality +"%;";
  document.getElementById("hum").style="height:"+ data[0].Humidity +"%;";
  var light=data[0].Light /10; // schaal van 1000=100%;
    document.getElementById("light").style="height:"+ light +"%;";
    var tempAbs=Math.abs(data[0].Temperature);
    var temp;
    if (data[0].Temperature<=0){
      temp=50-tempAbs;
    }else{
      temp= tempAbs + 50;
    }

    document.getElementById("temp").style="height:"+ temp +"%;";
    myMap(data[0].Latitude,data[0].Longtitude);


});
