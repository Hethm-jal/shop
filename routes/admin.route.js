const router = require("express").Router();
const adminController = require("../controolers/admin.controller");
const adminProtect = require("../routes/protectRoutes/admin.protectRoute");
const multer = require("multer");
const check = require("express-validator").check;

router.get("/admin/add", adminProtect.isAdmin, adminController.getAdd);

router.post(
  "/admin/add",
  adminProtect.isAdmin,
  multer({
    storage: multer.diskStorage({
      destination: (req, res, cb) => {
        cb(null, "image");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single("image"),
  check("image").custom((value, { req }) => {
    if (req.file) {
      return true;
    } else {
      throw "image is required";
    }
  }),
  adminController.postAdd
);

module.exports = router;
