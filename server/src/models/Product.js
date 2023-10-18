const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Product = sequelize.define('products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
