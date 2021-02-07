const mongoose = require("mongoose");
const db_url ='mongodb+srv://hethm:hethm@cluster0.aikln.mongodb.net/online-shop?retryWrites=true&w=majority'

const cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  productId: String,
  timestamp: Number,
});
const CartItem = mongoose.model("cart", cartSchema);

const addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url,{ useNewUrlParser: true })
      .then(() => {
        let item = new CartItem(data);
        return item.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

const getItemsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return CartItem.find(
          { userId: userId },
          {},
          { sort: { timestamp: -1 } }
        );
      })
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
const editItem = (id, newData) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return  CartItem.updateOne({_id:id},newData)
      })
      .then((item) => {
        mongoose.disconnect();
        resolve(item);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return  CartItem.findByIdAndDelete(id)
      })
      .then((item) => {
        mongoose.disconnect();
        resolve(item);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports = {
  addNewItem: addNewItem,
  getItemsByUserId: getItemsByUserId,
  editItem:editItem,
  deleteItem:deleteItem,
};
