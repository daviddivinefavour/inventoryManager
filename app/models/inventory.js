const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventory.belongsTo(models.Store);
    }
  }
  Inventory.init(
    {
      name: DataTypes.STRING,
      unitsAvailable: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Inventory',
      tableName: 'inventories',
      underscored: true
    }
  );
  return Inventory;
};
