const express = require("express");
const router = express.Router();

const ReviewController = require("../controllers/reviewController");
const { isAuthenticated } = require("../middlewares");


router.post("/", isAuthenticated ,ReviewController.create);
router.get("/",isAuthenticated ,ReviewController.readAll);
router.get("/:id",isAuthenticated, ReviewController.readById);
router.patch("/:id", isAuthenticated, ReviewController.update);
router.delete("/:id",isAuthenticated, ReviewController.delete);

module.exports = router;
