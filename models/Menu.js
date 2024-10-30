const { Sequelize, DataTypes } = require('sequelize');
const db = requrie("../db.js")
// TODO - create a Menu model
const Menu = db.define("Menu", {
    title: DataTypes.STRING
})

module.exports = {Menu};