var express = require('express');
var storesAdminrouter = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Store = require('../models/store');


//NEED TO UP DATE TO OR \\ CALL FOR LIVE VERSION ON HEROKU: !!!!!!!!!!!!!!!!
//var connectionString = (process.env.MONGOLAB_URI ||  'mongodb://localhost:27017/consciousshopperdb');


//Call to pull all the stores to DOM    uses var Stores


    storesAdminrouter.get('/', function(req,res){

        //Search for stores
        //passing venue as key from manually created object in client
        var query = req.query.venue;
        if(query) {
            Store.find({"name": query}, function (err, data) {
                if (err) {
                    console.log("ERROR! : ", err);
                }
                res.send(data);
            });

        } else {
            Store.find({}, function(err, data){
                if(err){
                    console.log("ERROR! : ", err);
                }
                res.send(data);
            });
        }
    });


//Will delete stores when user hit delete button attached to store.
storesAdminrouter.delete('/', function(req,res){

    Store.findByIdAndRemove({"_id" : req.body.id}, function(err, data){
        if(err) console.log(err);
        res.send(data);
    });

});


//Will grab store by id when  edit button attached to store is clicked.
storesAdminrouter.post('/', function(req,res){

    Store.findById({"_id" : req.body.id}, function(err, data){
        if(err) console.log(err);
        res.send(data);
    });

});



storesAdminrouter.get('/*', function(req, res) {
    var file = req.params[0] || "views/sct97ad33min.html";
    res.sendFile(path.join(__dirname, "../public/", file));

});

module.exports = storesAdminrouter;