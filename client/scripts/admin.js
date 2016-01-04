
var editStoreId;

$(document).ready(function() {


        //updateDOM(data);
        $('#storeSearchEdit').keypress(function (event) {
            enabledEnter();
            console.log("someone hit enter key");

        });

        $("#storeContainer").on('click', '.delete', deleteStore);

             //getStores();
                updateDOM();

});


// takes data from input field clears data and sends to storesAdmin.js for search
     function enabledEnter() {
         if (event.keyCode == 13) {
             event.preventDefault();

             //serialize array didn't work with keypress.  went with .val and manual object for ajax data:
             var search = $('#storeAdminSearch').val();
             console.log("This is the value: ", search);

             $('#storeSearchEdit').find("input[type=text]").val("");


             $.ajax({
                 type: "GET",
                 url: "/getstores",
                 data: {"venue" : search},
                 success: function (data) {
                     updateDOM(data);
                     console.log("ajax went to getstores");
                     console.log("value of search", search);
                 }
             });
         }
     }



$(document).ready(function() {

        //$('#storeAdminSearch').on('return', 'search', findStore);

        //updateDOM(data);

        $("#storeContainer").on('click', '.delete', deleteStore);
        $("#storeContainer").on('click', '.edit', editStore);
             getStores();
                updateDOM();

});
        function getStores() {

            $.ajax({
                type: "GET",
                url: "/getstores",
                success: function (data) {
                    updateDOM(data)
                }
            });
        }

        function updateDOM(data) {
            $('#storeContainer').empty();

            for (var i = 0; i < data.length; i++) {
                var el = "<div class='well col-md-3'>" +
                    "<p>" + data[i].name + "</p>" +
                    "<button class='btn btn-danger delete' data-id='" + data[i]._id + "'>Delete</button>" +
                    "<button class='btn btn-primary edit' data-id='" + data[i]._id + "'>Edit</button>" +

                    "</div>";
                $("#storeContainer").append(el);
            }
        }
        // So _id and id is weird    data-id in UPDATE DOM.  Need "id" in deleteStore,
        // but data[i]._id in UpdateDom
        function deleteStore() {
            var deletedId = {"id": $(this).data("id")};

            console.log(deletedId);

            $.ajax({
                type: "DELETE",
                url: "/deletestores",
                data: deletedId,
                success: function (data) {
                    clearPage();
                }
            });
        }

    function clearPage() {
        $.ajax({
            type: 'GET',
            url: '/getstores',
            success: function (data) {
                updateDOM(data);
            }

        })
    }


function editStore() {
    editStoreId = {"id": $(this).data("id")};
        //{"name": $(this).data("name")}];

    console.log(editStoreId);

    $.ajax({
        type: "post",
        url: "/editstore",
        data: editStoreId,
        success: function (data) {
            //window.location.replace('/assets/views/add00store.html');
            console.log("Here is the /editstore data", data);
            console.log(editStoreId);
            editStoreId = data;
            populateFields(data);
        }
    });
}
//
var populateFields = function(data){
    window.location.replace('/assets/views/add00store.html');
    console.log("test");

    //console.log(editStoreId);
    //$("#addStoreForm")address.val(data.address)
}



//
//
//function populateFields(editStoreId) {
//
//    $.ajax({
//        method: 'GET',
//        url: '/getstoreforedit',
//        data: editStoreId,
//
//        //data: {"_id": editStoreId},
//        success: function (data) {
//            console.log("The response data: ", data);
//        }
//    });
//}
//
//populateFields(editStoreId);


    //
    //function findStore(data) {
    //    $('#storeAdminSearch').keypress(function (e) {
    //        if (e.which == 13) {
    //            var el = "<div class='well col-md-3'>" +
    //                "<p>" + data[i].name + "</p>" +
    //                "<button class='btn btn-danger delete' data-id='" + data[i].id + "'>Delete</button>" +
    //                "button class='btn btn-primary edit' data-id='" + data[i].id + "'>Edit</button>" +
    //                "</div>";
    //            $('storeContainer').append(el);
    //        }
    //    });
    //}                                                                                                          ////Function to find the store -- called within getCurrentLocation
//var findStore = function(){
//    console.log("The location data being sent to the db as search criteria: ", myLatLng);
//    $.ajax({
//        type: "GET",
//        url: "/addStore",
//        data: myLatLng,
//        success: function(data){
//            console.log("The data response from the db: ", data);
//            storesFound = data;
//            console.log("The storesFound: ", storesFound);
//            initMap(myLatLng, storesFound);
//            return storesFound;
//        }
//    });
//};

//search store database
//function findStore() {
//    event.preventDefault();
//    var stores = {};
//
//    $.each($(this).serializeArray(), function (i, field) {
//        stores[field.name] = field.value;
//    });
//
////clears the search input after enter
//    $('#storeSearchAdd').find("input[type=text]").val("");
//
//    $.ajax({
//        type: "GET",
//        url: "/data",
//        data: stores,
//        success: function (data) {
//            getStores();
//        }
//    });
//}
