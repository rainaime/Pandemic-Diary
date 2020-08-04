const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const UserSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	}
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUserPassword = function(userName, password) {
	const User = this // binds this to the User model

	// First find the user by their email
	return User.findOne({ userName: userName }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }