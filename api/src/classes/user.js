const jwt = require('jsonwebtoken');
const config = require('../config');

class user {
    constructor (data) {
        this.userData = data;
    }

    get data() {
        return this.userData;
    }

    createAuthToken() {
        return jwt.sign(
            { id: this.data.id },
            config.secret,
            { expiresIn: config.authToken.expires }
        );
    }
}

module.exports = user;
