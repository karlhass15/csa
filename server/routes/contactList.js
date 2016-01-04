var express = require('express');
var router = express.Router();
var Store = require('../Models/store');


router.get('/', function(req, res){
    console.log("Here is the req.query: ", req.query);
    Store.aggregate({$geoNear: {near: [parseFloat(req.query.lng), parseFloat(req.query.lat)], distanceField: "distance",
            query : {categories : {$elemMatch : {category: req.query.category}}}, spherical: true, limit: 3 }},
        function(err, data){
            if (err) {
                console.log("Error in the query!: ", err);
            }
            res.send(data);
        })
});

module.exports = router;