require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'todo-list',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  dialect: process.env.DB_DIALECT || 'postgres',
  seederStorage: 'sequelize',
};
