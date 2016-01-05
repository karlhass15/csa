var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

//original /assets/views/register.html
router.get('/', function (req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/views/r1egister774.html'));
});

router.post('/', function(req,res,next){
    Users.create(req.body, function(err,post){
        if(err){
            next(err);
        } else {
            res.redirect('assets/views/reg429log33in.html');
        }
    }) ;
});

module.exports = router;
