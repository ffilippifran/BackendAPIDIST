const express = require("express");
const router = express.Router();
const { isAuthenticated } = require('../middlewares/index');
const { isOwner } = require('../middlewares/index');
const RestaurantController = require("../controllers/restaurantController");

router.get("/:id/menu",isAuthenticated ,RestaurantController.getMenu);
router.get("/:id/review",isAuthenticated ,RestaurantController.getReview);
router.get("/nearby",isAuthenticated ,RestaurantController.getNearbyRestaurants);
router.get("/filter", isAuthenticated , RestaurantController.filter);
router.get("/",isAuthenticated , RestaurantController.readAll);
router.post("/", isOwner, RestaurantController.create);
router.delete("/:id",isOwner, RestaurantController.delete);
router.get("/my",isOwner,RestaurantController.getMyRestaurants)
router.get("/:id", isAuthenticated , RestaurantController.readById);
router.patch("/:id",isOwner,RestaurantController.update);


module.exports = router;
