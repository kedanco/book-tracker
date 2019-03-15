var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var secret = require("../config/index").secret;

let UserSchema = new Schema(
	{
		username: {
			type: String,
			lowercase: true,
			required: [true, "can't be blank"],
			match: [/\S+@\S+\.\S+/, "is invalid"],
			trim: true,
			index: true
		},
		hash: String,
		salt: String
	},
	{ timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

/* We'll be generating a random salt for each user. Then we can use crypto.crypto.pbkdf2Sync() to generate hashes using the salt. pbkdf2Sync() takes five parameters: The password to hash, the salt, the iteration (number of times to hash the password), the length (how long the hash should be), and the algorithm. */

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString("hex");
	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
		.toString("hex");
};

/* To see if a password is valid for a particular user, we need to run the pbkdf2 with the same number of iterations and key length as our setPassword function with the salt of the user; then we need to check to see if the resulting hash matches the one that's stored in the database. */

UserSchema.methods.validPassword = function(password) {
	var hash = crypto
		.pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
		.toString("hex");
	return this.hash === hash;
};

// 3 fields for the JWT token's payload

UserSchema.methods.generateJWT = function() {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			id: this._id,
			username: this.username,
			exp: parseInt(exp.getTime() / 1000)
		},
		secret
	);
};

/* we'll need a method on the user model to get the JSON representation of the user that will be passed to the front-end during authentication. This JSON format should only be returned to that specific user since it contains sensitive information like the JWT. */

UserSchema.methods.toAuthJSON = function() {
	return {
		username: this.username,
		// email: this.email,
		token: this.generateJWT()
	};
};

module.exports = mongoose.model("Book", UserSchema);
