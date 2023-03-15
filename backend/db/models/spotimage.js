'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {

    static associate(models) {
      SpotImage.belongsTo(models.Spot, { foreignKey: "spotId" })
    }
  }
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preview: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SpotImage',

  });
  return SpotImage;
};
