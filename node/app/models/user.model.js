var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
	dob:String,
}, {
    timestamps: true
});


module.exports = mongoose.model('User', UserSchema);