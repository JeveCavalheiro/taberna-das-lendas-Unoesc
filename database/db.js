require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,      
  process.env.PG_PASSWORD, 
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres', 
    logging: false,      
  }
);

async function authenticateDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

authenticateDB();

module.exports = sequelize;