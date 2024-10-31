const { Sequelize, DataTypes } = require('sequelize');
const db = require("../db.js")

const Item = db.define("Item", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.NUMBER,
    vegetarian: DataTypes.BOOLEAN
});

module.exports = Item;