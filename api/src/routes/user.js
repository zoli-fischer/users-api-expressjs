const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const database = require('../database');
const router = express.Router();

/* Get user token */
router.get('/', (req, res, next) => {
    const token = req.signedCookies.token;
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.send(JSON.stringify({ "status": 500, "error": "Failed to authenticate token.", "response": null }));
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": { "token": token, "user_id": decoded.id } }));
    });
});

/* Post login */
router.post('/auth', (req, res, next) => {
    database.connection().query("SELECT id, email FROM users WHERE email = ? AND password = PASSWORD(?)", [req.body.email, req.body.password], function (error, results, fields) {
        if (error || results.length === 0) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            const user = results[0];

            // create a token
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.token.expires,
            });

            res.cookie("token", token, { 
                expires: new Date(Date.now() + config.token.cookieExpires), // expires in 14 day
                httpOnly: true,
                signed: true,
            });

            res.send(JSON.stringify({ "status": 200, "error": null, "response": {
                user: user,
                token: token,
            }}));
            //If there is no error, all is good and response is 200OK.
        }
        database.close();
    });
});

/* Logout user */
router.get('/logout', (req, res, next) => {
    res.cookie("token", "", {
        expires: new Date(Date.now() - 1), // set expired
    });

    res.send(JSON.stringify({ "status": 200, "error": null, "response": null }));
});

module.exports = router;
