const mongoose = require('mongoose');
Schema = mongoose.Schema
const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profileImageURL: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: false,
    default: 0
  },
  restaurantID: {
    type: Schema.Types.ObjectId, ref: 'Restaurant',
    required: true
  }
});

ReviewSchema.set("toJSON", {
  transform: function(doc, returned, options) {
    returned.id = returned._id;
    delete returned._id;
  }
});

module.exports = mongoose.model("Review", ReviewSchema);
