var express = require('express');
var router = express.Router();
var path = require('path');
var login = require('./login');
var register = require('./register');
var storesAdmin = require('./storesAdmin');

router.use('/storesAdmin', storesAdmin);
router.use('/login', login);
router.use('/register', register);


router.get("/*", function (req, res) {
    var file = req.params[0] || "/assets/views/index.html";

    //additional security for url in client side
    // if url contains '/admin/'
    //if (req.params[0] && req.params[0].split('/admin/').length > 1){
    //    if(req.user){
    //        // user is logged in, so they can have the file
    //        res.sendFile(path.join(__dirname, "..//public", file));
    //    } else {
    //        // status code for not authorized
    //        res.send(401);
    //    }
    //
    //} else {
        res.sendFile(path.join(__dirname, "..//public", file));
    //}
});


module.exports = router;