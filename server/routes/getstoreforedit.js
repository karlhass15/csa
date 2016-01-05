var express = require('express');
var router = express.Router();
var Store = require('../models/store');


//db connection to find and replace content based on unique id
router.get('/', function(req, res){
    console.log("Here is the req: ", req);
    Store.findByIdAndUpdate(req.query.data.id, {
        $set: {
            "name" : req.query.data.storename,
            "address" : req.query.data.address,
            "description" : req.query.data.description,
            "categories" : req.query.data.categories,
            "latlong" : req.query.data.latlong,
            "website" : req.query.data.website,
            "image" : req.query.data.image,
            "loc" : {type: "Point", coordinates: [parseFloat(req.query.data.latlong[1]), parseFloat(req.query.data.latlong[0])]}
        }
    }, function(err, result){
        if (err){
            console.log(err);
        }
        console.log("RESULT: " + result);
    });
    res.send('Done');
});


module.exports = router;