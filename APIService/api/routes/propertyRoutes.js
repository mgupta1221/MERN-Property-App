var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ dest: 'assets/' });
var type = upload.single('propertyImage');


var propertyController = require('../controllers/propertyController');
router.get('/products', propertyController.get_all_products);
router.post('/saveProperty', type, propertyController.SaveProperty);
router.post('/getProperty', type, propertyController.GetPropertyById);
router.post('/getProperties', propertyController.GetAllProperties);

module.exports = router;


