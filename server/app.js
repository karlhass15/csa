var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('./strategies/user');
var session = require('express-session');
var localStrategy = require('passport-local');
var contact = require('./routes/contact');
var index = require('./routes/index');
var store =  require('./routes/addStore');
var Stores = require('./routes/storesAdmin');
var Delete =require('./routes/storesAdmin');
var editstore =require('./routes/storesAdmin');
//var getstoreforedit =require('./routes/getstoreforedit');


var category = require('./routes/categorySearch');
var categorylist = require('./routes/categoryList');


app.set("port", process.env.PORT || 5000);

app.use(session({
    secret: 'secret',
    key: "user",
    resave : true,
    saveUninitialized : false,
    cookie: {maxAge:6000, secure: false}
}));

//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

//NEED TO UP DATE TO OR \\ CALL FOR LIVE VERSION ON HEROKU: !!!!!!!!!!!!!!!!
mongoose.connect(process.env.MONGOLAB_URI ||  'mongodb://localhost:27017/consciousshopperdb');
//var mongoURI = "mongodb://localhost:27017/consciousshopperdb";
//
//var mongoDB = mongoose.connect(mongoURI).connection;
//
//mongoDB.on('error', function(err){
//    if(err) console.log("MONGO ERROR: ", err);
//});
//
//mongoDB.once('open', function(){
//    console.log("Connected to Mongo, meow!");
//});
app.use('/deletestores', Delete);
app.use('/getstores', Stores);
app.use('/editstore', editstore);
//app.use('/getstoreforedit', getstoreforedit);
app.use('/contact', contact);
app.use('/addStore', store);
app.use('/categorysearch', category);

app.use('/categorylist', categorylist);
app.use('/', index);

app.listen(app.get('port'), function(){
    console.log("Listening on port: ", app.get('port'));

});