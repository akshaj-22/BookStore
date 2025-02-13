const { sequelize, connectDB } = require("../config/db");
const User = require("./User");
const Book = require("./Book");
const Cart = require("./Cart");

const initializeTables = async () => {
  await sequelize.sync({ force: false }); 
  console.log("All tables initialized.");
};

module.exports = { connectDB, initializeTables, User, Book, Cart };
