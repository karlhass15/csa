var express = require('express');
var router = express.Router();
var Store = require('../Models/store');


router.get('/', function(req, res){
    console.log("Here is the req.query: ", req.query);

    Store.find({_id : {$in : req.query.paramArray}},
        function(err, data){
            if (err) {
                console.log("Error in the query!: ", err);
            }
            res.send(data);
        })
});

module.exports = router;