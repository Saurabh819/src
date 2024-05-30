const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://saurabh:1010@localhost:5432/truekart');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  role: {
    type: DataTypes.ENUM('admin', 'seller','customer'), // Define possible roles
    allowNull: false,
    defaultValue: 'customer' // Default role is user
  }
},
// {
//   indexes: [
//     {
//       unique: true,
//       fields: ['email'] // Index the email column
//     }
//   ]
// }
);


// (async () => {
//   try {
//     await sequelize.sync({ force: true }); // This will drop the table if it already exists
//     console.log('Admin table created successfully');
//   } catch (error) {
//     console.error('Error syncing model with database:', error);
//   }
// })();

module.exports = Admin;

// console.log(User === sequelize.models.User); 