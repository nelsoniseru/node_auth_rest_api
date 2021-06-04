var express = require('express');
var router = express.Router();
var UserController = require("../controller/userController")
/* GET users listing. */
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
module.exports = router;
