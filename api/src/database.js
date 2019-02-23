const mysql = require("mysql");
const config = require('./config');

const database = {};

let connection = null;

database.connection = () => {
    if (!connection) {
        connection = mysql.createConnection(config.database);
        connection.connect();
    }
    return connection;
}

database.close = () => {
    connection.end();
}

module.exports = database;