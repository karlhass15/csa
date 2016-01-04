var myLatLng = {};
var storesFound = [];
var storeContent = [];


$(document).ready(function(){


    displayLoading();


    $('body').css('overflow','hidden');

    var flag = 1;

    $('#popupButton').click(function() {
        if(flag == 1){
        $("#navMenu")
            .stop(true, false)
            .animate({
                bottom: 150
            }, 600);

            flag = 0;
        } else {
            $("#navMenu")
                .stop(true, false)
                .animate({
                    bottom: 50
                }, 600);
            flag = 1;
        }

        //return false;
    });



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
            console.log("The storesFound: ", storesFound);
            displayCompleted();
            initMap(myLatLng, storesFound);

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
};



//Map initialization function -- called within findStore function
var initMap = function(myLocation, storesFound){
    storeContent = [];
    var infoWindow = new google.maps.InfoWindow(), otherMarker, i;

    var map = new google.maps.Map(document.getElementById('mapContainer'), {
        zoom: 12,
        center: myLocation,

        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        }


    });

    var marker = new google.maps.Marker({
        position: myLocation,
        map: map,
        title: 'You Are Here',

    });
    marker.addListener('click', function() {
        console.log("center");
    });
    console.log("What is the storesFound?: ", storesFound);
    //Iteration through returned stores to create markers on the map
    for (var i = 0; i < storesFound.length; i++) {
        console.log("Processing the marker data: ", storesFound[i]);


        var otherMarker = new google.maps.Marker({
            position: new google.maps.LatLng(storesFound[i].latlong[0], storesFound[i].latlong[1]),
            map: map,
            title: storesFound[i].name,
            //will likely need to iterate through an icon counter
            icon: 'http://maps.google.com/mapfiles/ms/micons/purple-dot.png',

        });

        //Setting up the store content in an array for easy reference to the popup creation below
        var storeData = setContentstring(storesFound[i]);
        storeContent.push(storeData);
        console.log("The storeContent is: ", storeContent);

    //creating the popup window for each marker
        google.maps.event.addListener(otherMarker, 'click', (function (otherMarker, i) {
            console.log("click!");
            return function(){
                infoWindow.setContent(storeContent[i]);
                infoWindow.open(map, otherMarker);
            }
        })(otherMarker, i));

    }
    /////end init map
};

var setContentstring = function(store){

    var miles = (store.distance * 3963.2).toFixed(1);
    var query = "https://www.google.com/maps/dir/Current+Location/";
    var lat = store.latlong[0];
    var long = store.latlong[1];
    var mapsLink = query + lat + "," + long;

    contentString =
        '<div class="container">' +
        '<div class="col-xs-12">' +
        //'<img src="http://www.logoorange.com/thumb-portfolio/logo_thumbnail_military-design-logo.png" alt="store logo"/>'+
        //    '<img src='+store.image+'>' + ///this line grabs url input from form correctly
        '<img src="http://www.fillmurray.com/500/400" alt="store logo"/>'+

        '</div>' +
        '<div class="col-xs-12">' +

        '<h4><a href="store.html"> '+store.name+'</a></h4>' +
        '<h5>' + store.description + '</h5></br>'+
        '<h5><strong>' + miles + ' Miles</strong></h5>' +

            //'<h5><a href=" '+var+' "></a>Website</h5>' + NEED TO SET UP DIRECTIONAL DATA
        '<button><a href=" '+mapsLink+' ">Directions</a></button>' +
        '</div>'+
        '</div>';
    return contentString;

};

function displayLoading(){

    $('#spin').addClass('spinner');
    $('body').addClass('backgroundSpin');
}

function displayCompleted(){
    $('#spin').removeClass('spinner');
    $('body').removeClass('backgroundSpin');


}