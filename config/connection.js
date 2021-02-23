const Sequelize = require("sequelize");

const config = require("@config/config");

module.exports = new Sequelize(
    config.credentials.db_database,
    config.credentials.db_username,
    config.credentials.db_password,
    {
        host: config.credentials.db_host,
        dialect: "mysql",
    }
);
