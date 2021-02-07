const router = require("express").Router();
const bodyParser = require("body-parser");
const cartController = require("../controolers/cart.controllers");
const authProtect = require("../routes/protectRoutes/auth.protectRoute");
const check = require("express-validator").check;

router.get("/cart", authProtect.isAuth, cartController.itemGet);

router.post(
  "/cart",
  authProtect.isAuth,
  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .not()
    .isEmpty()
    .withMessage("amount is required")
    .isInt({ min: 1 })
    .withMessage("amount must be greater than 0"),
  cartController.itemPost
);
router.post(
  "/cart/save",
  authProtect.isAuth,
  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .not()
    .isEmpty()
    .withMessage("amount can't be empty")
    .isInt({ min: 1 })
    .withMessage("amount must be greater than 0"),
  cartController.postSaveCart,
);
router.post('/cart/delete', authProtect.isAuth,
cartController.postDeleteCart,

)
module.exports = router;
