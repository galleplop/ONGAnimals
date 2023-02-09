const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Animal', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgs: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  },
    {
      timestamps: false
    });
};