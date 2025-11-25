'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setor extends Model {
    static associate(models) {
      Setor.hasMany(models.OrdemProducao, {foreignKey: 'setorId'});
    }
  }
  Setor.init({
    nome: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Setor',
    tableName: 'Setores',
    underscored: false
  });
  return Setor;
};