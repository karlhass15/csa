var parameters = {};

$(document).ready(function(){

    displayLoading();
    getCurrentLocation();

    $('#categoriesList').on('click', '.category', function(){
        var testValue = $(this).text();
        parameters.category = testValue;
        categorySearch();
    });


});


//Function list
var categorySearch = function(){
    $.ajax({
        method: "GET",
        url: "/categorysearch",
        data: parameters,
        success: function(data) {
            if (data.length < 1) {
                alert("There are no stores nearby that match your category criteria.");

            } else {
                storeLocalData(data);

            }
        }
    });
};

var storeLocalData = function(data){
    //local storage
    var sessionString = data[0]._id;
  for (var i=1; i<data.length; i++){
      sessionString += "," + data[i]._id;
  }
    sessionStorage.setItem('store_ids', sessionString);
    var test = sessionStorage.getItem('store_ids');
    window.location.replace('/assets/views/categorystorelist.html');
};


//finding the user's current lcoation

var getCurrentLocation = function() {
    //Geolocation to get the current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            parameters.lat = parseFloat(position.coords.latitude);
            parameters.lng = parseFloat(position.coords.longitude);
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

function displayLoading(){
    $('#categoriesList').hide();
    $('#spin').addClass('spinner');
}

function displayCompleted(){
    $('#spin').removeClass('spinner');
    $('#categoriesList').show();
}