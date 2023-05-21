'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserActivities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        UserActivities.belongsTo(models.Users, { foreignKey: 'user_id' });
        UserActivities.belongsTo(models.Activities, { foreignKey: 'activity_id' });
    }
  }
  UserActivities.init({
    user_id: DataTypes.INTEGER,
    activity_id: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserActivities',
  });
  return UserActivities;
};