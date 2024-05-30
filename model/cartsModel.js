const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://saurabh:1010@localhost:5432/truekart"
);
const Customer = require("./customerModel");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.STRING,
      references: {
        model: Customer,
        key: "id",
      },
    },
  },
  { timestamps: true }
);

(async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop the table if it already exists
    console.log('Cart table created successfully');
  } catch (error) {
    console.error('Error syncing model with database:', error);
  }
})();

module.exports = Cart;
