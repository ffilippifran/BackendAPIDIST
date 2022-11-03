const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isRefreshToken } = require('../middlewares/index');



router.post('/signup', authController.signup);
router.post('/resetpassword', authController.sendPasswordReset);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post("/:userId/:token",authController.PasswordReset);

module.exports = router;