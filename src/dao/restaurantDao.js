const mongoose = require("mongoose");
const { _isValidLogin } = require("../helpers");

const RestaurantModel = require("../models/Restaurant");
const Restaurant = mongoose.model("Restaurant");

exports.create = async data => {
  try {
    const restaurant = new Restaurant(data);
    return await restaurant.save();
  } catch (err) {
    throw err;
  }
};


exports.readAll = async () => {
  try {
    return await Restaurant.find({});
  } catch (err) {
    throw err;
  }
};

exports.readById = async id => {
  try {
    const restaurant = await Restaurant.findById(id);
    return restaurant;
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await Restaurant.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
  } catch (err) {
    throw err;
  }
};

exports.delete = async id => {
  try {
    return await Restaurant.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};

exports.readByDishType = async dishType => {
  try {
    return await Restaurant.find({ dishesTypes: dishType });
  } catch (err) {
    throw err;
  }
};

exports.findByOwner = async id => {
  try{
    return await Restaurant.find({'ownerID' : id})
  }catch (err) {
    throw err;
  }

};

exports.filterBasedDishesTypes = async types => {
  try {
    return await Restaurant.aggregate()
      .unwind("$dishesTypes")
      .match({ dishesTypes: { $in: types } })
      .group({ _id: "$_id", restaurants: { $push: "$$ROOT" } });
  } catch (err) {
    throw err;
  }
};
