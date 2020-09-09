'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
    City: String,
    PropertyName: String,
    PropertyType: String,
    Size: Number,
    Price: Number,
    AreaType: String,
    OwnerId: String,
    fileName:String
});

module.exports = {
    PropertyModel: mongoose.model('RealEstateProperty', PropertySchema, "RealEstateProperty")  
};