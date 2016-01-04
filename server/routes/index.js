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
    res.sendFile(path.join(__dirname, "..//public", file));
});


module.exports = router;