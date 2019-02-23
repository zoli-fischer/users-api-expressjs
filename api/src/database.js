const mysql = require("mysql");
const databaseJSON = require('../../db/database.json'); // eslint-disable-line node/no-unpublished-require
const config = databaseJSON[process.env.NODE_ENV];

const database = {};

let connection = null;

database.connection = () => {
    if (!connection) {
        connection = mysql.createConnection({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database,
        });
        connection.connect();
    }
    return connection;
}

database.close = () => {
    // connection.end();
}

module.exports = database;