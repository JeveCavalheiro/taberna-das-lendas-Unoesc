'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdemProducao extends Model {
    static associate(models) {
      OrdemProducao.belongsTo(models.Setor, {foreignKey: 'setorId'});
      OrdemProducao.belongsTo(models.ItemComanda, {foreignKey: 'itemComandaId'})
    }
  }
  OrdemProducao.init({
    itemComandaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    setorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pendente', 'preparando', 'pronto', 'entregue'),
      allowNull: false,
      defaultValue: 'pendente'
    },
  }, {
    sequelize,
    modelName: 'OrdemProducao',
    tableName: 'OrdemProducoes',
    underscored: false
  });
  return OrdemProducao;
};