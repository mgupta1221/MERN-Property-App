const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    UserEmail: String,
    givenName: String,
    familyName: String
});
var RoleSchema = new Schema({
    _id: Schema.Types.ObjectId,
    RoleId: Number,
    RoleName: String
});
var UserRoleSchema = new Schema({
    _id: Schema.Types.ObjectId,
    UserId: String,
    RoleId: Number
});


module.exports = {
    UserModel: mongoose.model('User', UserSchema, "User"),
    RoleModel: mongoose.model('Role', RoleSchema, "Role"),
    UserRoleModel: mongoose.model("UserRole", UserRoleSchema, "UserRole")
};