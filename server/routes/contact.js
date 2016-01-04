var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mailer = require('../Models/email.server.model');

var Schema = mongoose.Schema;

//mongoose.connect(process.env.MONGOLAB_URI ||  'mongodb://localhost:27017/consciousshopperdb');

mongoose.model('Email', new Schema({"name": String, "email": String, "message": String}, {collection: 'emails'}));
var Person = mongoose.model('Email');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({expanded: true}));

router.post('/', function(req,res){
    //console.log(req);
    var addedContact = new Person({
        "name" : req.body.name,
        "email" : req.body.email,
        "message" : req.body.message
    });

    addedContact.save(function(err, data){
        if(err) console.log(err);
        //res.send(data);
    });

    mailer.sendMail(req, res);

});
module.exports = router;
