'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cardapio extends Model {
    static associate(models) {
      Cardapio.hasMany(models.ItemComanda, {foreignKey: 'itemCardapioId'});
    }
  }
  Cardapio.init({
    nome: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    descricao: DataTypes.TEXT,
    preco: {
      type:DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagem: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Cardapio',
    tableName: 'Cardapios',
    underscored: false
  });
  return Cardapio;
};