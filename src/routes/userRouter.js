const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/index');




router.post("/favorites", isAuthenticated, userController.addfavorites);
router.get('/favorites', isAuthenticated, userController.getfavorites);

module.exports = router;