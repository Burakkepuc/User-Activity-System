'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsTo(models.Titles, {
        foreignKey: 'title_id',
      }),
        Users.belongsToMany(models.Activities, {
          through: 'UserActivities',
          foreignKey: 'user_id',
        });
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      title_id: DataTypes.INTEGER,
      isAdmin: DataTypes.BOOLEAN,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
