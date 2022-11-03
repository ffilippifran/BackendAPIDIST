const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/index');




router.post("/favorites", isAuthenticated, userController.getfavorites);
router.get('/favorites', isAuthenticated, userController.addfavorites);

module.exports = router;