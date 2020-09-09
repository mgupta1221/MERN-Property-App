var express = require('express');
var router = express.Router();

var apiCount = require('../controllers/apiCountController');
router.get('/apiCount', apiCount.get_api_count);

module.exports = router;


// 'use strict';
// module.exports = function (app) {
//     var apiCount = require('../controllers/apiCountController');

//     // api Count Routes
//     app.route('/apiCount')
//         .get(apiCount.get_api_count)        

// };