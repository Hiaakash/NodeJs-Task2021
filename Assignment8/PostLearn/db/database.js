const Sequelize = require('sequelize');

var db = new Sequelize('usertest', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });

  module.exports = db;