const { Sequelize, DataTypes } = require('sequelize');
const db = require("../db.js")
// TODO - create a Menu model
const Menu = db.define("Menu", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Restaurants', // This should match the table name in the database
            key: 'id'
        },
        allowNull: false // Ensure that this field cannot be null
    }
});
module.exports = Menu;