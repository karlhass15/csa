var myLatLng = {};
var storesFound = [];
var storeContent = [];


$(document).ready(function(){

    //displayLoading();



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






function appDom(array) {




    for (var i = 0; i < array.length; i++) {

        var miles = (array[i].distance * 3963.2).toFixed(1);
        var query = "https://www.google.com/maps/dir/Current+Location/";
        var lat = array[i].latlong[0];
        var long = array[i].latlong[1];
        var mapsLink = query + lat + "," + long;

        $('#store').append( '<div class="container">' +
            '<div class="col-xs-4">' +
            '<img src="http://www.logoorange.com/thumb-portfolio/logo_thumbnail_military-design-logo.png" alt="store logo"/>'+
            '</div>' +
            '<div class="col-xs-8">' +
            '<h4><strong></strong>'+ array[i].name +' </strong>' + miles+ ' miles</h4>' +
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