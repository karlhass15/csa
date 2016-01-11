//establishing variables
var myLatLng = {};
var storesFound = [];
var storeContent = [];

//document functionality
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
    });
    getCurrentLocation();

//click listener
    $('body').on('click', '.action', function(){
        //clear storage every time the button is clicked
        localStorage.clear();
        console.log('working');
        console.log($(this).data('list'));
        var arrayPosition = Number($(this).data('list'));
        console.log(storesFound[arrayPosition]);
        localStorage.setItem('kittyFoo', JSON.stringify(storesFound[arrayPosition]));
        window.location.href='store.html';
    });
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
    var infoWindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(document.getElementById('mapContainer'), {
        zoom: 12,
        center: myLocation,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        }
    });
    //Initializing the map bounds
    var bounds = new google.maps.LatLngBounds();
    var marker = new google.maps.Marker({
        position: myLocation,
        map: map,
        title: 'You Are Here'
    });
    marker.addListener('click', function() {
        console.log("center");
    });
    //Iteration through returned stores to create markers on the map
    for (var i = 0; i < storesFound.length; i++) {

        var otherMarker = new google.maps.Marker({
            position: new google.maps.LatLng(storesFound[i].latlong[0], storesFound[i].latlong[1]),
            map: map,
            title: storesFound[i].name,
            //will likely need to iterate through an icon counter
            icon: 'http://maps.google.com/mapfiles/ms/micons/purple-dot.png'
        });
        //Setting up the store content in an array for easy reference to the popup creation below
        var storeData = setContentstring(storesFound[i], i);
        storeContent.push(storeData);
        //creating the popup window for each marker
        google.maps.event.addListener(otherMarker, 'click', (function (otherMarker, i) {
            console.log("click!");
            return function(){
                infoWindow.setContent(storeContent[i]);
                infoWindow.open(map, otherMarker);
            }
        })(otherMarker, i));
        //setting the bounds for each marker as it is loaded
        bounds.extend(otherMarker.position);
    }
    //introducing the user's location to the bounds to ensure that they are mapped
    bounds.extend(marker.position);
    map.fitBounds(bounds);
    /////end init map
};


var setContentstring = function(store, num){
    var miles = (store.distance * 3963.2).toFixed(1);
    var query = "https://www.google.com/maps/dir/Current+Location/";
    var lat = store.latlong[0];
    var long = store.latlong[1];
    var mapsLink = query + lat + "," + long;
    console.log("here is store ",store);
    contentString =
        '<div class="container">' +
        '<div class="col-xs-12">' +
        '<h4 class = "action" data-list=" '+ num +' "> '+store.name+'</h4>' +

        //'<img src="http://www.fillmurray.com/300/200" alt="store logo"/>'+
            // image tag below should work, color is webstorm error
        '<img src=" ' + store.image + ' " />' +
        '</div>' +
        '<div class="col-xs-12">' +
        '<h5>' + store.description + '</h5></br>'+
        '<h6>' + miles + ' Miles</h6>' +
            //'<h5><a href=" '+var+' "></a>Website</h5>' + NEED TO SET UP DIRECTIONAL DATA
        '<button><a href=" '+mapsLink+' ">Directions</a></button>' +
        '</div>'+
        '</div>';
    return contentString;
};

//spinner functions
function displayLoading(){
    $('#spin').addClass('spinner');
    $('body').addClass('backgroundSpin');
}

function displayCompleted(){
    $('#spin').removeClass('spinner');
    $('body').removeClass('backgroundSpin');
}