'use strict';


var mongoose = require('mongoose');
var apiCountUtil = require('../Utilities/ApiCountHelper');

exports.get_api_count = function (req, res) {
    return res.json(apiCountUtil.readAPIHits())
};


