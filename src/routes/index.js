const userRoutes = require("./users.route");
const authRoutes = require("./auth.route");
const productRoutes = require("./products.route");

module.exports = [...userRoutes, ...authRoutes, ...productRoutes];
