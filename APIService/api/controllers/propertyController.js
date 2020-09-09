'use strict';

const mongoose = require('mongoose');
const path = require("path");
const { PropertyModel, UserModel } = require('../models/PropertyModel');
var fs = require('fs');
const { v4: uuidV4 } = require('uuid');


var _get_all_products = async function (req, res, next) {
    var product = [{
        id: 1,
        name: "Just For Test"
    },
    ];
    return res.json(product);
};

var _saveProperty = async function (req, res, next) {

    const extension = path.extname(req.file.originalname);
    try {
        var filename = uuidV4();
        var property_instance = new PropertyModel({
            City: req.body.city,
            PropertyName: req.body.propertyName,
            PropertyType: req.body.propertytype,
            Size: req.body.size,
            Price: req.body.price,
            AreaType: req.body.areaType,
            OwnerId: req.body.ownerId,
            fileName: filename + extension
        });
        var tmp_path = req.file.path;

        const target_path = path.join(__dirname, '../assets/' + filename + extension);
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
       // src.on('end', function () { res.json({ result: 'complete' }) });
        src.on('error', function (err) { res.json({ error: err }) });

        property_instance.save(function (err, resp) {
            res.json({ Resp: resp });
        });
    }
    catch (err) {

    }
}

var _getPropertyById = async function (req, res, next) {
    try {

        var query = PropertyModel.find({ _id: req.body.id });
        query.exec(function (err, resp) {
            // if (err) return handleError(err);
            res.send(resp[0]);

        })
    }
    catch (err) {

    }
}

var _getAllProperties = async function (req, res, next) {
    try {
        var param = {};
        if (req.body.excludeMyProperty) {
            param.OwnerId = { $ne: req.body.email };
        }
        else {
            param.OwnerId = req.body.email;
        }
        var query = PropertyModel.find(param);
        query.exec(function (err, resp) {
            // if (err) return handleError(err);
            res.send(resp);

        })
    }
    catch (err) {

    }
}


module.exports = {
    SaveProperty: _saveProperty,
    GetAllProperties: _getAllProperties,
    GetPropertyById: _getPropertyById,
    get_all_products: _get_all_products
};

