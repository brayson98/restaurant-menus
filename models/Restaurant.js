const db = require('../db.js');
const { Sequelize, DataTypes } = require('sequelize');

// TODO - create a Restaurant model

const Restaurant = db.define("Restaurant", {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    cuisine: DataTypes.STRING
})

module.exports = {Restaurant};