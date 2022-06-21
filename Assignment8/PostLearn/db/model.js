const Sequelize = require('sequelize');
const db = require("./database");
const { DataTypes } = require("sequelize");

var Users = db.define('userinfo',{
    // id: {type :Sequelize.INTEGER, primaryKey : true},

    first_name : Sequelize.STRING,

    last_name : Sequelize.STRING,
    
    email : Sequelize.STRING,

    gender :  Sequelize.STRING,

    password : Sequelize.STRING
}, 
{timestamps: false,
freezeTableName: true}
)
module.exports = Users;
