var parameters = {};

$(document).ready(function(){
    getCurrentLocation();
    $('#categoriesList').on('click', '.category', function(){
        var testValue = $(this).text();
        console.log("This is the testValue: ", testValue);
        parameters.category = testValue;
        categorySearch();

    });


});


//Function list
var categorySearch = function(){
    console.log("Category search parameters: ", parameters);
    $.ajax({
        method: "GET",
        url: "/categorysearch",
        data: parameters,
        success: function(data){
            console.log("This is the data: ", data);
            //Local storage test
            storeLocalData(data);
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

    console.log("Test of the local storage: ", test);
    window.location.replace('/assets/views/categorystorelist.html');
};


//finding the user's current lcoation

var getCurrentLocation = function() {
    //Geolocation to get the current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            parameters.lat = parseFloat(position.coords.latitude);
            parameters.lng = parseFloat(position.coords.longitude);
            console.log("The variable parameters: ", parameters);
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