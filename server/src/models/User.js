const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const User = sequelize.define('users', {
  //Si no definimos la propiedad "id" dentro del objeto que define los campos de la tabla, sequelize lo define por nosotros con las configuraciones por defecto tal como las definimos en este ejemplo.
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  first_name: DataTypes.STRING(100),
  last_name: DataTypes.STRING(100),
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
