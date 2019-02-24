const database = require('../database');
const user = require('./user');

class users {
    static create(data) {
        return new Promise((resolve, reject) => {
            const fields = [];
            const values = [];
            Object.keys(data).forEach(key => {
                fields.push('`' + key + '`');
                values.push(data[key]);
            });
            database().query("INSERT INTO users (" + fields.join(",") + ") VALUES (?) ", [values], (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            database().query("SELECT * FROM users", (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            database().query("SELECT * FROM users WHERE id = ? LIMIT 1", [id], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else if (results.length !== 1) {
                    reject("User not found");
                } else {
                    resolve(new user(results[0]));
                }
            });
        });
    }

    static getByAuthCredential(email, password) {
        return new Promise((resolve, reject) => {
            database().query("SELECT * FROM users WHERE email = ? AND password = PASSWORD(?) LIMIT 1", [email, password], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else if (results.length !== 1) {
                    reject("User not found");
                } else {
                    resolve(new user(results[0]));
                }
            });
        });
    }
}

module.exports = users;
