const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db_url ='mongodb+srv://hethm:hethm@cluster0.aikln.mongodb.net/online-shop?retryWrites=true&w=majority'
const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("user", userSchema);

///////////////////////////////Sign up/////////////////////////////

const creatUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url,{ useNewUrlParser: true })
      .then(() => {
        return User.findOne({ email: email });
      })
      //user is result of User.find({})
      .then((user) => {
        if (user) {
          reject("email is used");
          mongoose.disconnect();
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hashedpassword) => {
        console.log(password);
        console.log(hashedpassword);
        let user = new User({
          username: username,
          email: email,
          password: hashedpassword,
        });
        return user.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve("user created");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
///////////////////////////////Login/////////////////////////////
const login = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("ther is no user matches this email");
        } else {
          // is password == user.password
          bcrypt
            .compare(password, user.password)
            ///// same is result for return bcrypt.compare(password,user.password)
            .then((same) => {
              if (!same) {
                mongoose.disconnect();
                reject("please enter correct password");
              } else {
                mongoose.disconnect();
                resolve({
                  id: user._id,
                  isAdmin: user.isAdmin,
                });
              }
            });
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
///////////////////////////////////////////////////////////
module.exports = {
  creatUser: creatUser,
  login: login,
};
