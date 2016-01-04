var express = require('express');
var router = express.Router();
var Store = require('../models/store');

//router.get('/', function (req, res){
//    console.log("We've received a category search request!");
//    res.send("Success");
//});

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

//Store.find({$geoSearch : "stores", near: [parseFloat(req.query.lng), parseFloat(req.query.lat)], maxDistance: 20,
//    search: {categories: {$elemMatch : {category: req.query.category}}, limit: 5}},

//{categories: {$elemMatch: {category : req.query.category}}}
//{$and: [{address: "3736 17th Ave S, Minneapolis, MN 55407"}, {categories: {$elemMatch: {category : "Eco-Friendly"}}}]}