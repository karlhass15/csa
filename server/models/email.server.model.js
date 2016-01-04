'use strict';
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var options = {
    auth: {
        // sendgrid_password api key  MIGHT NEED TO HIDE THIS KEY CHECK HEROKU CONFIG
        api_key: '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'
    }
};
var mailer = nodemailer.createTransport(sgTransport(options));

exports.renderIndex = function(req,res) {
    res.render('server/views/index', {
        user: req.user || null
    })
};
//render server error page
exports.renderServerError = function(req, res) {
    res.status(500).render('server/views/500', {
        error: 'Opps! Something went wrong...?'
    });
};
//render server not found page
exports.renderNotFound = function(req, res) {
    res.status(404).render('server/views/404', {
        url: req.originalUrl
    });
};
//send an email when the contact form is submitted
exports.sendMail = function(req, res) {

    //turns info from email.html form into data
    var data = req.body;

    //what will be sending in the email
    //NEED TO CHANGE EMAIL TO COSCIOUS SHOPPING EMAIL UPON COMPLETION TEST!!!!!!!
    var email = {
        to: ['karl.hass15@gmail.com'],
        from: data.email,
        subject: 'Message from ' + data.name,
        text: data.message
    };

    //fires off email
    mailer.sendMail(email, function(err, res) {
        if (err) {
            console.log("send error", err)
        }
        //console.log(res);
    });
    console.log("sending email!!");

};
