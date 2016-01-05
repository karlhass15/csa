var express = require('express');
var router = express.Router();
var Store = require('../models/store');

router.get('/', function(req, res){
    console.log("Here is the req.body: ", req.body);
    //Store.findById(editStoreId, function(err, result){
    //    if(err){
    //        console.log(err);
    //    }
    //    console.log("RESULT: " + result);
    //});
    res.send('Done');
});


module.exports = router;
