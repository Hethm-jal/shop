const authModel = require("../models/auth.model");
const validationResult = require("express-validator").validationResult;

const getSignup = (req, res, next) => {
  res.render("signup", {
    validationErrors: req.flash("validationError"),
    signupError: req.flash("signUpError")[0],
    isUser: false,
    isAdmin:false,
    pageTitle:'SignUp'
  });
};

///////////////////////////////////////////////////////////////////
const postSignup = (req, res, next) => {
  console.log(validationResult(req).array());
  if (validationResult(req).isEmpty()) {
    authModel
      .creatUser(req.body.username, req.body.email, req.body.password)
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
        req.flash("signUpError", err);
        res.redirect("/signup");
      });
  } else {
    req.flash("validationError", validationResult(req).array());
    res.redirect("/signup");
  }
};

///////////////////////////////////////////////////////
const getLogin = (req, res, next) => {
  res.render("login", {
    err: req.flash("authError")[0],
    validationErrors: req.flash("validationError"),
    isUser: false,
    isAdmin:false,
    pageTitle:'Login'
  });
};

const postLogin = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    authModel
      .login(req.body.email, req.body.password)
      .then((result) => {
        req.session.userId = result.id;
        req.session.isAdmin = result.isAdmin;

        res.redirect("/");
      })
      .catch((err) => {
        req.flash("authError", err);
        res.redirect("/login");
      });
  } else {
    req.flash("validationError", validationResult(req).array());
    res.redirect("/login");
  }
};

const logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
////////////////////////////////////////////
module.exports = {
  getSignup: getSignup,
  postSignup: postSignup,
  getLogin: getLogin,
  postLogin: postLogin,
  logout: logout,
};
