const RestaurantDAO = require("../dao/restaurantDao");
const ReviewDAO = require("../dao/reviewDao");
const DishDAO = require("../dao/dishDao");


const MAX_DISHES_HOME_SECTION = 20;



exports.create = async (req, res, next) => {
  try {
    const { id } = await DishDAO.create(req.body);

    return res.status(201).json({
      id
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};

exports.readAll = async (req, res, next) => {
  try {
    const allDishes = await DishDAO.readAll();
   
    return res.status(200).json({
      allDishes
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Solicitud incorrecta"
      });
    }

    const dish = await DishDAO.readById(id);

    if (!dish) {
      return res.status(404).json({
        message: "Dish Not Found"
      });
    }

    return res.status(200).json({
      dish
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "The field id is required."
      });
    }

    const dishUpdated = await DishDAO.update(id, { ...req.body });

    if (!dishUpdated) {
      return res.status(404).json({
        message: "Dish Not Found"
      });
    }

    return res.status(200).json({
      dishUpdated
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "The field id is required"
      });
    }

    const dishDeleted = await DishDAO.delete(id);

    if (!dishDeleted) {
      return res.status(404).json({
        message: "Dish Not Found"
      });
    }

    return res.status(200);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};
