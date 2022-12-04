const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/index');
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const uploadFile = require('../config/s3')


router.post("/favorites", isAuthenticated, userController.addfavorites);
router.get('/favorites', isAuthenticated, userController.getfavorites);
router.get('/favorites/:id',isAuthenticated,userController.checkFavorites)

module.exports = router;