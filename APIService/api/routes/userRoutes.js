var express = require('express');
var router = express.Router();



var userRoleController = require('../controllers/userController');
router.post('/saveuser', userRoleController.SaveUser);
router.post('/userlogin', userRoleController.UserLogin);
module.exports = router;


