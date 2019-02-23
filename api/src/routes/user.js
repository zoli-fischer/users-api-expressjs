const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const isAuthorized = require('../auth');
const response = require('../response');
const users = require('../classes/users');
const router = express.Router();

router.param('user_id', function(req, res, next, id) {
    req.user = null;
    users.getById(id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(error => {
        response.error(res, 500, error);
    });
});

/* Get user authToken */
router.get('/token', (req, res, next) => {
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
router.post('/signin', (req, res, next) => {
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
router.get('/signout', (req, res, next) => {
    res.cookie(config.authToken.cookieName, "", {
        expires: new Date(Date.now() - 1), // set expired
        httpOnly: true,
        signed: true,
    });
    response.success(res);
});


/* Create new user */
router.put('/', isAuthorized, (req, res, next) => {
    users.create({
        email: req.body.email,
        password:  req.body.password,
    })
    .then(user => {
        response.success(res, {
            userId: user.data.id,
        });
    })
    .catch(error => {
        response.error(res, 500, error);
    });
});

/* Delete user by id */
router.delete('/:user_id', isAuthorized, (req, res, next) => {
    users.delete(req.user.data.id)
    .then(() => {
        response.success(res);
    })
    .catch(error => {
        response.error(res, 500, error);
    });
});

module.exports = router;
