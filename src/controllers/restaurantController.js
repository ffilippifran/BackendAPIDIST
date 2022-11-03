const RestaurantDAO = require("../dao/restaurantDao");
const ReviewDAO = require("../dao/reviewDao");
const DishDAO = require("../dao/dishDao");
const {isAdmin, isOwner, isAuthenticated} = require('../middlewares/index');
const calculateCoordsDistance = require("../utils/calculateDistance");

const MAX_NEARBY_RESTAURANTS = 10;
const MAX_DISHES_MENU = 10;


exports.getMenu = async (req,res) => {
  if(!req.params.id) res.status(00).send({success: false, error: "Solicitud incorrecta, id obligatorio"});
  try{
    if(req.params.dishType != null){
      const dishByType = allDishes.filter(
      dishe => dishe.type === dishType
      );
    }

    const menu =  DishDAO.getMenu(req.params.id)
    if(menu){
      return res.status(200).send({success: true, menu: menu});
    }else{
      return res.status(404).send({success: false, error: "no existe menu/restaurant con ese id"});
    }
  }
  catch(error){
      return res.status(500).send({success: false, error: error.message});
  }
  


};

exports.getReview = async (req,res) => {
  if(!req.params.id) res.status(00).send({success: false, error: "Solicitud incorrecta, id obligatorio"});
  try{
    const reviews =  ReviewDAO.getReviewsbyResturant(req.params.id)
    if(reviews){
      return res.status(200).send({success: true, reviews: reviews});
    }else{
      return res.status(404).send({success: false, error: "no existe reviews con ese Restaurantid"});
    }
    return reviews
  }
  catch(error){
      return res.status(500).send({success: false, error: error.message});
  }
};

const _filterRestaurantsByDistance = (
  restaurants,
  maxDistance,
  userLocation
) => {
  const nearRestaurants = restaurants.filter(restaurant => {
    const { coordinates } = restaurant.location;

    const distanceBetweenCoordinates = calculateCoordsDistance(
      userLocation,
      {
        latitude: coordinates[0],
        longitude: coordinates[1]
      }
    );

    const isInsideSearchRadius = distanceBetweenCoordinates <= maxDistance;

    return isInsideSearchRadius;
  });

  return nearRestaurants;
};

const _getAllNearestRestaurants = async (maxDistance, userLocation) => {
  const allRestaurants = await RestaurantDAO.readAll();

  const restaurants = _filterRestaurantsByDistance(
    allRestaurants,
    maxDistance,
    userLocation
  );

  return restaurants;
};

const _filteredRestaurantsBasedDishType = async (
  dishesTypes,
  maxDistance,
  userLocation
) => {
  const dishes = Array.isArray(dishesTypes) ? dishesTypes : [dishesTypes];

  const restaurantsFilteredByDishesTypes = await RestaurantDAO.filterBasedDishesTypes(
    dishes
  );

  const restaurantsParsed = restaurantsFilteredByDishesTypes.map(item => ({
    ...item.restaurants[0],
    id: item.restaurants[0]._id
  }));

  const restaurants = _filterRestaurantsByDistance(
    restaurantsParsed,
    maxDistance,
    userLocation
  );

  return restaurants;
};

const _handleDistanceBetweenUserAndRestaurant = (
  rawUserLocation,
  restaurant
) => {
  const { userlatitude, userlongitude } = rawUserLocation;

  const userLocation = {
    latitude: parseFloat(userlatitude),
    longitude: parseFloat(userlongitude)
  };

  const restaurantLocation = {
    latitude: restaurant.location.coordinates[0],
    longitude: restaurant.location.coordinates[1]
  };

  const distance = calculateCoordsDistance(
    userLocation,
    restaurantLocation
  );

  return distance.toFixed(1);
};

exports.create = async (req, res, next) => {
  try {
    const { id } = await RestaurantDAO.create(req.body);

    return res.status(201).json({
      message: "Restaurant created with Success!",
      id
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Create Restaurant."
    });
  }
};


exports.readAll = async (req, res, next) => {
  try {
    const restaurants = await RestaurantDAO.readAll();

    return res.status(200).json({
      restaurants
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Read All Restaurant."
    });
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { headers, params } = req;
    const { id } = params;

    const restaurantFromDB = await RestaurantDAO.readById(id);
    const distanceBetweenCoordinates = _handleDistanceBetweenUserAndRestaurant(
      headers,
      restaurantFromDB
    );

    const menu = await _getRestaurantMenu(restaurantFromDB.dishesTypes);
    const isOpen = restaurantFromDB.isOpen

    return res.status(200).json({
      restaurant: {
        ...restaurantFromDB._doc,
        id: restaurantFromDB._doc._id,
        distance: distanceBetweenCoordinates,
        isOpen
      },
      menu
    });
  } catch (err) {

    return res.status(500).json({
      message: "Error when trying to Read Restaurant."
    });
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { headers, params } = req;
    const { id } = params;

    const restaurantFromDB = await RestaurantDAO.readById(id);
    const distanceBetweenCoordinates = _handleDistanceBetweenUserAndRestaurant(
      headers,
      restaurantFromDB
    );

    const menu = await _getRestaurantMenu(restaurantFromDB.dishesTypes);
    const isOpen = restaurantFromDB.isOpen

    return res.status(200).json({
      restaurant: {
        ...restaurantFromDB._doc,
        id: restaurantFromDB._doc._id,
        distance: distanceBetweenCoordinates,
        isOpen
      },
      menu
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Read Restaurant."
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: `The field 'id' mandatory.`
      });
    }

    const restaurant = await RestaurantDAO.update(id, { ...req.body });

    if (restaurant) {
      return res.status(200).json({
        restaurant
      });
    }

    return res.status(404).json({
      message: "Restaurant Not Found"
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Update Restaurant."
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurantDeleted = await RestaurantDAO.delete(id);

    if (restaurantDeleted) {
      return res.status(200).json({
        message: "Restaurant Deleted with Success!"
      });
    }

    return res.send(404).json({
      message: "Restaurant Not Found"
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Delete Restaurant."
    });
  }
};

exports.getNearbyRestaurants = async (req, res, next) => {
  try {
    const { headers, query } = req;
    const { dishesType } = query;

    if (!headers.userlatitude || !headers.userlongitude) {
      return res.status(400).json({
        message: "User Location is required."
      });
    }

    const restaurantsFilteredByDishTypes = await RestaurantDAO.filterBasedDishesTypes(
      [dishesType]
    );

    const restaurants = restaurantsFilteredByDishTypes
      .map(item => ({
        ...item.restaurants[0],
        id: item.restaurants[0]._id,
        location: {
          latitude: item.restaurants[0].location.coordinates[0],
          longitude: item.restaurants[0].location.coordinates[1]
        },
        distance: _handleDistanceBetweenUserAndRestaurant(
          headers,
          item.restaurants[0]
        ),
        isOpen: _getRandomNumber(1, 2) % 2 === 0
      }))
      .sort((first, second) => {
        return first.distance - second.distance;
      });

    return res.status(200).json({
      restaurants: restaurants.slice(0, MAX_NEARBY_RESTAURANTS)
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Read by Dishe Type."
    });
  }
};

exports.filter = async (req, res, next) => {
  try {
    const { query, headers } = req;
    const { dishesTypes, maxDistance } = query;
    const { userlatitude, userlongitude } = headers;

    if (!dishesTypes) {
      return res.status(400).json({
        message: "Dishes Types is required."
      });
    }

    if (!maxDistance) {
      return res.status(400).json({
        message: "Max Distance is required."
      });
    }

    if (!userlatitude || !userlongitude) {
      return res.status(400).json({
        message: "User Location is required."
      });
    }

    const userLocation = {
      latitude: parseFloat(userlatitude),
      longitude: parseFloat(userlongitude)
    };

    const restaurants =
      dishesTypes === "all"
        ? await _getAllNearestRestaurants(maxDistance, userLocation)
        : await _filteredRestaurantsBasedDishType(
            dishesTypes,
            maxDistance,
            userLocation
          );

    return res.status(200).json({
      restaurants
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Filter Restaurants."
    });
  }
};
