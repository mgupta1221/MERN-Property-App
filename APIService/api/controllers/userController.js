'use strict';
const mongoose = require('mongoose');
const { UserRoleModel, UserModel } = require('../models/UserRoleSchema');


var _saveUser = async function (req, res, next) {
    var user = new UserModel({
        UserEmail: req.body.email,
        givenName: req.body.givenName,
        familyName: req.body.familyName
    });
    var query = UserModel.find({ UserEmail: req.body.email });
    query.exec(function (err, resp) {
        if (err) return handleError(err);
        if (resp && resp.length == 0)
            user.save(function (err, resp2) {
                res.json(user);
            });
        else {
            res.json(resp[0]);
        }
    })

}


var _userLogin = async function (req, res, next) {
    var query = UserModel.find({ UserEmail: req.body.email });
    query.exec(function (err, resp) {
        if (err) return handleError(err);
        if (resp.length == 0) {
            res.json([]);
        }
        else {
            res.send(resp[0]);
        }
    })
}

module.exports = {
    SaveUser: _saveUser,
    UserLogin: _userLogin
};;
