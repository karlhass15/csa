var retrievedInfo = {};
var storeInfo = {};

$(document).ready(function(){

    populateFields();
    $("#editStoreForm").submit(addStore);

});


//loading data from local storage into form if there is a store being edited
var populateFields = function() {
    //retrieving the store info from local storage
    retrievedInfo = localStorage.getItem('editInfo');
    retrievedInfo = JSON.parse(retrievedInfo);

    console.log("This is the retrievedInfo: ", retrievedInfo);

    $(".storename").val(retrievedInfo.name);
    $(".address").val(retrievedInfo.address);
    $(".description").val(retrievedInfo.description);
    $(".website").val(retrievedInfo.website);
    $(".image").val(retrievedInfo.image);
    //This repopulates the checkboxes
    for(var i=0; i<retrievedInfo.categories.length; i++){
        $("input[value=" + "'" + retrievedInfo.categories[i].category + "'" + "]").prop("checked", true);
    }
};

//function to take form data and prep for db query
var addStore = function() {
    event.preventDefault();

    storeInfo = {};
    var categories = [];
    var geocoder = new google.maps.Geocoder();

    $.each($(this).serializeArray(), function (i, field) {
        storeInfo[field.name] = field.value;
    });
    //Taking the checklist and building it into an array
    var objectBuilder = $('input:checkbox:checked.group1').map(function () {
        return this.value;
    }).get();
    //Taking the array and converting it into an array of objects. This will facilitate database searching
    for (var i = 0; i < objectBuilder.length; i++) {
        categories.push({'category': objectBuilder[i]});
    }
    storeInfo.categories = categories;
    storeInfo.id = retrievedInfo._id;
    //Geocode the address
    geocoder.geocode({'address': storeInfo.address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            var latlong = [];
            latlong.push(latitude);
            latlong.push(longitude);
            storeInfo.latlong = latlong;
            changeStore();
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
};

//sending the edited info on the store to the db to replace old data, based on the unique id
var changeStore = function() {

    $.ajax({
        type: "GET",
        url: "/getstoreforedit",
        data: {data: storeInfo},
        success: function(data){
            clearForm();
        }
    });
};

//clearing the form and local storage
var clearForm = function() {
    //$(".addStoreForm").empty();
    $("#editStoreForm").find("input[type=text]").val("");
    $("#editStoreForm").find("textarea").val("");
    $("#editStoreForm").find("input[type=checkbox]").removeAttr('checked');
    localStorage.removeItem('editInfo');
    window.location.replace('/assets/views/sct97ad33min.html');
};