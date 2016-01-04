$(document).ready(function() {

    $("#addStoreForm").submit(addStore);
    populuteFields();


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

    //$('#informationTab a').click(function (e) {
    //    if($(this).parent('li').hasClass('active')){
    //        $( $(this).attr('href') ).hide();
    //    }
    //    else {
    //        e.preventDefault();
    //        $(this).tab('show');
    //    }
    //});

    //$('#goods').tab('show'); // Select tab by name
    //$('#ethicalStandard').tab('show'); // Select tab by name

});

    function addStore(){
        event.preventDefault();

        var storeInfo = {};
        var categories = [];
        var geocoder = new google.maps.Geocoder();

        if(retrievedInfo._id){
            editStore();
        }

        $.each($(this).serializeArray(), function (i, field) {
            storeInfo[field.name] = field.value;
        });

        //Taking the checklist and building it into an array
        var objectBuilder = $('input:checkbox:checked.group1').map(function () {
            return this.value;
        }).get();

        //Taking the array and converting it into an array of objects. This will facilitate database searching
        for (var i=0; i<objectBuilder.length; i++){
            categories.push({'category': objectBuilder[i]});
        }


        storeInfo.categories = categories;

        //Geocode the address
        geocoder.geocode({'address': storeInfo.address}, function(results, status){
            if (status == google.maps.GeocoderStatus.OK){
                var latitude=results[0].geometry.location.lat();
                var longitude=results[0].geometry.location.lng();
                var latlong = [];
                latlong.push(latitude);
                latlong.push(longitude);
                storeInfo.latlong = latlong;
                postStore();
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });





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
        }



    }

var clearForm = function() {
    //$(".addStoreForm").empty();
    $("#addStoreForm").find("input[type=text]").val("");
    $("#addStoreForm").find("textarea").val("");
    $("#addStoreForm").find("input[type=checkbox]").removeAttr('checked');
    localStorage.removeItem('editInfo');
};

var populuteFields = function() {
    var retrievedInfo = localStorage.getItem('editInfo');
    retrievedInfo = JSON.parse(retrievedInfo);
    $(".storename").val(retrievedInfo.name);
    $(".address").val(retrievedInfo.address);
    $(".description").val(retrievedInfo.description);
    $(".website").val(retrievedInfo.website);
    $(".image").val(retrievedInfo.image);

};

var editStore = function() {
    $.ajax({
        type: "GET",
        url: "/editStore",
        data: storeInfo,
        success: function(data){
            clearForm();

        }
    });
};









