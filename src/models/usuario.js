'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Comanda, {foreignKey: 'usuarioCpf'});
    }
  }
  Usuario.init({
    cpf:{
       type: DataTypes.STRING(14),
       primaryKey: true,
       allowNull: false
      },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email:{
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false
    },
    telefone: DataTypes.STRING(17),
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios',
    underscored: false
  });
  return Usuario;
};