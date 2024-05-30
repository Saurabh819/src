const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://saurabh:1010@localhost:5432/truekart');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  category: {
    type: DataTypes.ENUM('electronic', 'fashion','grocery','mobile'), // Define possible roles
    allowNull: false,
    defaultValue: 'electronic' // Default role is user
  },
  stock:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image_url:{
    type: DataTypes.STRING,
    allowNull: false
  },

},
{timestamps:true}
);


(async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop the table if it already exists
    console.log('Product table created successfully');
  } catch (error) {
    console.error('Error syncing model with database:', error);
  }
})();

module.exports = Product;

// console.log(User === sequelize.models.User); 