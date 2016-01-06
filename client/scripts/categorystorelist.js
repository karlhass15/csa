var storeIdArray;
var test;
var myLatLng;

$(document).ready(function(){

    displayLoading();
    getCurrentLocation();


});

var retrieveStores = function(){
    storeIdArray = localStorage.getItem('catStore');
    storeIdArray = JSON.parse(storeIdArray);
};

//Geolocation function to get current location
var getCurrentLocation = function() {
    myLatLng = {};

    //Geolocation to get the current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            myLatLng.lat = parseFloat(position.coords.latitude);
            myLatLng.lng = parseFloat(position.coords.longitude);
            retrieveStores();
            appDom(storeIdArray);
            displayCompleted();
        });
    } else {
        //Geolocation isn't supported by the browser
        handleLocationError(false, infoWindow, map.getCenter());
    }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }
};

function appDom(array) {

    for (var i = 0; i < array.length; i++) {
        var miles = (array[i].distance * 3963.2).toFixed(1);
        var query = "https://www.google.com/maps/dir/Current+Location/";
        var lat = array[i].latlong[0];
        var long = array[i].latlong[1];
        var mapsLink = query + lat + "," + long;

        $('#storeList').append( '<div class="container">' +

            '<div class="col-xs-4">' +
                //'<img src="http://www.logoorange.com/thumb-portfolio/logo_thumbnail_military-design-logo.png" alt="store logo"/>'+

            '<img src=" ' + array[i].image + ' " />' +
            '</div>' +
            '<div class="col-xs-8">' +
            '<h1 class="action" data-list=" '+ i +' "><strong>'+ array[i].name +' </strong></h1>' +
            '<h2>' + miles+ ' miles</h2>' +
            '<button><a href=" '+ mapsLink+ ' ">Directions</button>' +
            '</div>'+
            '</div>');
    }
}

function displayLoading(){
    $('#spin').addClass('spinner');
}

function displayCompleted(){
    $('#spin').removeClass('spinner');
}