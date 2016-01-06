var storeIdArray;
var test;

$(document).ready(function(){

    displayLoading();

    test = sessionStorage.getItem('store_ids');
    storeIdArray = test.split(',');
    console.log("The storeIdArray: ", storeIdArray);

    getStores();

});

var getStores = function(){
        $.ajax({
            method: 'GET',
            url: '/categorylist',
            data: {"paramArray": storeIdArray},
            success: function(data){
                console.log("The response data: ", data);
                appDom(data);
                displayCompleted();
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