var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");
var Users = require("../models/userModel");

passport.use(
	new LocalStrategy(
		{
			usernameField: "user[username]",
			passwordField: "user[password]"
		},
		function(username, password, done) {
			Users.findOne({ username: username })
				.then(function(user) {
					if (!user || !user.validPassword(password)) {
						return done(null, false, {
							errors: { "username or password": "is invalid" }
						});
					}
					return done(null, user);
				})
				.catch(done);
		}
	)
);
