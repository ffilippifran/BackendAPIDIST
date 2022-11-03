const express = require("express");
const router = express.Router();

const DishController = require("../controllers/dishController");
const { isOwner } = require("../middlewares");

router.post("/", isOwner , DishController.create);
router.get("/",isOwner, DishController.readAll);
router.get("/:id", isOwner ,DishController.readById);
router.patch("/:id",isOwner ,DishController.update);
router.delete("/:id", isOwner,DishController.delete);

module.exports = router;
