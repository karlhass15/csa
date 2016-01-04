$(document).ready(function(){
    $(".body").on("click", "#searchstores", function(){
        SearchStores();
        console.log("Click?");
    });

});

var SearchStores = function(){
    $.ajax({
        type: "GET",
        url: "/addStore",
        success: function(data){
            console.log("Here is the response data: ", data);
        }
    });
};