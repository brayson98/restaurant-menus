const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require("./Item")

Restaurant.hasMany(Menu, {
    foreignKey: 'restaurantId', // Foreign key in the Menu model
    as: 'menus' // Optional alias for the association
});

Menu.belongsTo(Restaurant, {
    foreignKey: 'restaurantId', // Foreign key in the Menu model
    as: 'restaurant' // Optional alias for the association
});

module.exports = { Restaurant, Menu, Item }
