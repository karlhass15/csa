var myLatLng = {};
var storesFound = [];
var storeContent = [];
var storeObject;


$(document).ready(function(){

    //displayLoading();

    localData();
    appDom(storeObject);


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
}






function appDom(store) {

    console.log("this is store in appDom ",store);
        var miles = (store.distance * 3963.2).toFixed(1);
        var query = "https://www.google.com/maps/dir/Current+Location/";
        var lat = store.latlong[0];
        var long = store.latlong[1];
        var mapsLink = query + lat + "," + long;

        $('#storeContainer').append( '<div class="container">' +
            '<div class="col-xs-4">' +
            '<img src="http://www.logoorange.com/thumb-portfolio/logo_thumbnail_military-design-logo.png" alt="store logo"/>'+
            '</div>' +
            '<div class="col-xs-8">' +
            '<h4><strong></strong>'+ store.name +' </strong>' + miles+ ' miles</h4>' +
            '<button><a href=" '+ mapsLink+ ' ">Directions</button>' +
            '</div>'+
            '</div>');



}

function displayLoading(){

    $('#spin').addClass('spinner');

}

function displayCompleted(){
    $('#spin').removeClass('spinner');


}

function localData(){
    var retrievedObject = localStorage.getItem('kittyFoo');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    storeObject = JSON.parse(retrievedObject);
    console.log("storeObject in local data ", storeObject);


    return storeObject;
}