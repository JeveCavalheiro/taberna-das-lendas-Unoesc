'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comanda extends Model {
    static associate(models) {
      Comanda.belongsTo(models.Usuario, {foreignKey:'usuarioCpf'});
      Comanda.hasMany(models.ItemComanda, {foreignKey: 'comandaId'});
    }
  }
  Comanda.init({
    mesa: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    aberta:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    total:{ 
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },

  }, {
    sequelize,
    modelName: 'Comanda',
    tableName: 'Comandas',
    underscored: false
  });
  return Comanda;
};