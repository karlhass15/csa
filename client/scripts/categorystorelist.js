var storeIdArray;
var test;

$(document).ready(function(){

    test = sessionStorage.getItem('store_ids');
    storeIdArray = test.split(',');
    console.log("The storeIdArray: ", storeIdArray);


    //$.each($(this).serializeArray(), function (i, field) {
    //    storeIdArray[field.name] = field.value;
    //});


    getStores();

});

var getStores = function(){
        $.ajax({
            method: 'GET',

            url: '/categorylist',
            data: {"paramArray": storeIdArray},
            success: function(data){
                console.log("The response data: ", data);
            }
    });
};
