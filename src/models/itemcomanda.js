'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemComanda extends Model {
    static associate(models) {
      ItemComanda.belongsTo(models.Comanda, {foreignKey: 'comandaId'});
      ItemComanda.belongsTo(models.Cardapio, {foreignKey: 'itemCardapioId'});
      ItemComanda.hasOne(models.OrdemProducao, {foreignKey: 'itemComandaId'})
    }
  }
  ItemComanda.init({
    comandaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemCardapioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entregue: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'ItemComanda',
    tableName: 'ItemComandas',
    underscored: false
  });
  return ItemComanda;

};