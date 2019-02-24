const express = require('express');
const isAuthorized = require('../auth');
const response = require('../response');
const users = require('../classes/users');
const router = express.Router();

/** Get requested user from database */
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

/* Create new user */
router.put('/', isAuthorized, (req, res, next) => {
    users.create({
        email: req.body.email,
        password:  req.body.password,
    })
    .then(userId => {
        response.success(res, {
            userId,
        });
    })
    .catch(error => {
        response.error(res, 500, error);
    });
});

/* Update a user */
router.put('/:user_id', isAuthorized, (req, res, next) => {
    req.user.update(req.body)
    .then(() => {
        response.success(res);
    })
    .catch(error => {
        response.error(res, 500, error);
    });
});

/* Delete user by id */
router.delete('/:user_id', isAuthorized, (req, res, next) => {
    req.user.delete()
    .then(() => {
        response.success(res);
    })
    .catch(error => {
        response.error(res, 500, error);
    });
});

module.exports = router;
