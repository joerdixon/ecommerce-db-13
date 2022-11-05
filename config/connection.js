// Config the dotenv package
require('dotenv').config();

// Require sequelize package
const Sequelize = require('sequelize');

// Create sequelize instance we will use
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// Export this specific sequelize instance for use in other files.
module.exports = sequelize;
