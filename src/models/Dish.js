const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      "Promocion",
      "Pasta",
      "Minutas",
      "Sugerencia del Cheff",
      "Japonesa",
      "Sushi",
      "Pizza",
      "Ensalada",
      "Mar",
      "Entrada",
      "Platos Calientes",
      "Bebidas",
      "Entrada",
      "Postre",
    ],
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    require: true
  },
  ingredients: {
    type: [String],
    require: true
  },
  isCeliac: {
    type: Boolean,
    required: true
  },
  isVeggie:{
    type: Boolean,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  thumbnailImageURL: {
    type: String,
    required: true
  },
  mediumImageURL: {
    type: String,
    required: true
  },
  restaurantID: {
    type: Schema.Types.ObjectId, ref: 'Restaurant',
    required: true
  }
});

DishSchema.set("toJSON", {
  transform: function(doc, returned, options) {
    returned.id = returned._id;
    delete returned._id;
  }
});

module.exports = mongoose.model("Dish", DishSchema);
