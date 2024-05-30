const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://saurabh:1010@localhost:5432/truekart"
);
const Cart = require("../model/cartsModel");
const Product = require("../model/productModel");

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
        type: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.STRING,
      references: {
        model: Cart,
        key: "id",
      },
    },
    cart_id: {
      type: DataTypes.STRING,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

(async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop the table if it already exists
    console.log("CartItem table created successfully");
  } catch (error) {
    console.error("Error syncing model with database:", error);
  }
})();

module.exports = CartItem;

// console.log(User === sequelize.models.User);
