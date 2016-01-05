//var retrievedInfo = {};
var storeInfo = {};

$(document).ready(function() {

    //populateFields();
    $("#addStoreForm").submit(addStore);

    //CategoriesTab and informationTab can be combined if we want the same naming convention for both (Tab instead of categoriesTab, etc.
    $('#categoriesTab a').click(function (e) {
        if($(this).parent('li').hasClass('active')){
            $( $(this).attr('href') ).hide();
        }
        else {
            e.preventDefault();
            $(this).tab('show');
        }
    });

});



//addStore function fires on click, preps information for upload to db and determines whether it's a new or edited store
var addStore = function() {
    console.log("Click!");
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

    //Geocode the address
    geocoder.geocode({'address': storeInfo.address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            var latlong = [];
            latlong.push(latitude);
            latlong.push(longitude);
            storeInfo.latlong = latlong;

            //This if statement determines whether the form being sent is for an existing store or a new store
            postStore();
            //if (retrievedInfo._id) {
            //    console.log("found the ID! It is: ", retrievedInfo._id);
            //    changeStore(retrievedInfo);
            //} else {
            //    postStore();
            //}
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
};



//POST storeInfo to Mongo
var postStore = function(){
    $.ajax({
        type: "POST",
        url: "/addStore",
        data: storeInfo,
        success: function(data){
            clearForm();
        }
    });
};

//clearing the form and local storage
var clearForm = function() {
    //$(".addStoreForm").empty();
    $("#addStoreForm").find("input[type=text]").val("");
    $("#addStoreForm").find("textarea").val("");
    $("#addStoreForm").find("input[type=checkbox]").removeAttr('checked');
    localStorage.removeItem('editInfo');
    window.location.replace('/assets/views/sct97ad33min.html');
};

//loading data from local storage into form if there is a store being edited
var populateFields = function() {
    retrievedInfo = localStorage.getItem('editInfo');
    retrievedInfo = JSON.parse(retrievedInfo);
    console.log("This is the retrievedInfo: ", retrievedInfo);
    $(".storename").val(retrievedInfo.name);
    $(".address").val(retrievedInfo.address);
    $(".description").val(retrievedInfo.description);
    $(".website").val(retrievedInfo.website);
    $(".image").val(retrievedInfo.image);

};

//sending the edited info on the store to the db to replace old data, based on the unique id
var changeStore = function(retrievedInfo) {
    console.log("Here is the retrievedInfo being passed to the ajax call: ", retrievedInfo);
    $.ajax({
        type: "GET",
        url: "/getstoreforedit",
        success: function(data){
            clearForm();
        }
    });
};