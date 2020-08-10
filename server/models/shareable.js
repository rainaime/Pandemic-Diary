/* Tweets mongoose model */
const mongoose = require('mongoose')

const ShareableSchema = new mongoose.Schema({
	content: {
		type: String,
//		required: true,
		minlegth: 1,
        unique: false,
     },
     date: {
          type: Date,
     },
     dateText: {
          type: String,
     },
     height: {
          type: Number,
     },
     selectedType: {
          type: String,
     }, 
     type: {
          type: String,
     },
     width: {
          type: Number,
     },
     center: {

     },
     user: {
          type: String,
     },
     img: {

     },
});


ShareableSchema.statics.findById = function (id) {
     const Set = this;

     return Set.findOne({ id: id }).then((set) => {
         if (!set) {
             return Promise.reject("No Shareable with ID"); // a rejected promise
         } else {
              return Promise.resolve(set);
         }
     });
 };

ShareableSchema.statics.findByDate = function(date) {
    const Set = this;

    const start = new Date(new Date(date).toDateString());
    const end = new Date(start.toDateString());
    end.setTime(start.getTime() + 86400000);

    return Set.find({
        date: {
            $gte: start,
            $lt: end
        }
    });
};

// make a model using the Shareable schema
const Shareable = mongoose.model("Shareable", ShareableSchema);

module.exports = { Shareable };
