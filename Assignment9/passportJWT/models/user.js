'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON(){
      return {...this.get(),id: undefined,uuid:undefined}
    }
  };
  User.init({
    uuid:{
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'userinfo',
    modelName: 'User',
  });
  return User;
};