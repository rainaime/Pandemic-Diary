/* Tweets mongoose model */
const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
	username: {
		type: String,
//        required: true,
        minlength: 1,
        trim: true,
        unique: false,
        index: { unique: false, dropDups: false }
	},
	content: {
		type: String,
//		required: true,
		minlegth: 1,
        unique: false,
        index: { unique: false, dropDups: false }
	},
});

// make a model using the Tweet schema
const Tweet = mongoose.model("Tweet", TweetSchema);

module.exports = { Tweet }