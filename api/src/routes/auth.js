const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const response = require('../response');
const users = require('../classes/users');
const router = express.Router();

/* Get user authToken */
router.get('/', (req, res, next) => {
    const authToken = req.signedCookies[config.authToken.cookieName];
    jwt.verify(authToken, config.secret, (error, decoded) => {
        if (error) {
            response.error(res, 500, "Failed to authenticate token.");
        } else {
            users.getById(decoded.id)
                .then(user => {
                    // renew authToken cookie
                    res.cookie(config.authToken.cookieName, authToken, { 
                        expires: new Date(Date.now() + config.authToken.cookieExpires), // expires in 14 day
                        httpOnly: true,
                        signed: true,
                    });
                    response.success(res, {
                        [config.authToken.cookieName]: authToken, 
                        userId: user.data.id, 
                    });
                })
                .catch(error => {
                    response.error(res, 500, error);
                });
        }
    });
});

/* Create user authToken from email and password */
router.post('/', (req, res, next) => {
    users.getByAuthCredential(req.body.email, req.body.password)
    .then(user => {
        // create authToken
        const authToken = user.createAuthToken();

        res.cookie(config.authToken.cookieName, authToken, { 
            expires: new Date(Date.now() + config.authToken.cookieExpires), // expires in 14 day
            httpOnly: true,
            signed: true,
        });

        response.success(res, {
            userId: user.data.id,
            authToken: authToken,
        });
    })
    .catch(error => {
        response.erro(res, 500, error);
    });
});

/* Invalidate user authToken */
router.delete('/', (req, res, next) => {
    res.cookie(config.authToken.cookieName, "", {
        expires: new Date(Date.now() - 1), // set expired
        httpOnly: true,
        signed: true,
    });
    response.success(res);
});

module.exports = router;
