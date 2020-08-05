/* Tweets mongoose model */
const mongoose = require('mongoose')

const Tweet = mongoose.model('Tweets', {
	username: {
		type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
	},
	content: {
		type: String,
		required: true,
		minlegth: 1,
	}
})

module.exports = { Tweet }