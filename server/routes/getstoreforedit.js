var express = require('express');
var router = express.Router();
var Store = require('../models/store');

router.get('/', function(req, res, editStoreId){
    console.log("Here is the req.body: ", editStoreId);
    Store.findById(editStoreId, function(err, result){
        if(err){
            console.log(err);
        }
        console.log("RESULT: " + result);
    });
    res.send('Done');
});

//router.get('/', function(req, res){
//    console.log("Here is the req.query: ", req.query);
//    Store.findById(req.body._id, {$set:req.body}, function(err, result){
//        if(err){
//            console.log(err);
//        }
//        console.log("RESULT: " + result);
//    });
//    res.send('Done');
//});

module.exports = router;


//
//$('input .callAjax').bind('change', function() {
//    $.ajax({ url: 'script/ajax',
//        type: json
//        data: $foo,
//        success: function(data) {
//            $('input .targetAjax').val(data.newValue);
//        });
//    );