const validationResult = require("express-validator").validationResult;
const cartModel = require("../models/cart.model");

const itemGet = (req, res, next) => {
  cartModel
    .getItemsByUserId(req.session.userId)
    .then((items) => {
      res.render("cart", {
        validationError:req.flash('validationError')[0],
        items: items,
        isUser: true,
        isAdmin:req.session.isAdmin,
        pageTitle:'cart'
      });

    })
    .catch((err) => {
      console.log(err);
    });
};
const itemPost = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .addNewItem({
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        productId: req.body.productId,
        userId: req.session.userId,
        timestamp: Date.now(),
      })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        res.redirect("/error");

      });
  } else {
    req.flash("validationError", validationResult(req).array());
    res.redirect(req.body.redirectTo);
  }
};

const postSaveCart = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .editItem(req.body.cartId, {
        amount: req.body.amount,
        timestamp: Date.now(),
      })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        res.redirect("/error");
      });
  } else {
    req.flash('validationError',validationResult(req).array())
    res.redirect('/cart')
  }
};
const postDeleteCart =(req,res,next)=>{
    cartModel
    .deleteItem(req.body.cartId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      res.redirect("/error");
    });
}
module.exports = {
  itemPost: itemPost,
  itemGet: itemGet,
  postSaveCart: postSaveCart,
  postDeleteCart:postDeleteCart
};
