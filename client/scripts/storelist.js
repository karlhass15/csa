var myLatLng = {};
var storesFound = [];
var storeContent = [];


$(document).ready(function(){

    displayLoading();
    getCurrentLocation();


});


//Function to find the store -- called within getCurrentLocation
var findStore = function(){
    console.log("The location data being sent to the db as search criteria: ", myLatLng);
    $.ajax({
        type: "GET",
        url: "/addStore",
        data: myLatLng,
        success: function(data){
            console.log("The data response from the db: ", data);
            storesFound = data;
            //console.log("The storesFound: ", storesFound);
            appDom(storesFound);
            displayCompleted();
            return storesFound;
        }
    });
};

//Geolocation function to get current location
var getCurrentLocation = function() {
    myLatLng = {};

    //Geolocation to get the current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            myLatLng.lat = parseFloat(position.coords.latitude);
            myLatLng.lng = parseFloat(position.coords.longitude);
            console.log("The variable LatLng: ", myLatLng);
            findStore();
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
}




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

            '<img src="http://www.fillmurray.com/500/400" alt="store logo"/>'+

            '</div>' +
            '<div class="col-xs-8">' +
            '<h4><a href="store.html"><strong>'+ array[i].name +' </strong></a></h4></br><h5>' + miles+ ' miles</h5>' +
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