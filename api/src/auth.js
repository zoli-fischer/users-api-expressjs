const jwt = require('jsonwebtoken');
const response = require('./response');
const config = require('./config');
const users = require('./classes/users');

module.exports = (req, res, next) => {
    console.log(req.cookies);
    const authToken = req.cookies[config.authToken.cookieName];
    console.log(req.headers.authorization, "Bearer " + authToken);
    if ( req.headers.authorization === "Bearer " + authToken ) {
        jwt.verify(authToken, config.secret, (err, decoded) => {
            if (err) {
                response.error(res, 500, "Failed to authenticate token.");
            } else {
                users.getById(decoded.id)
                .then(user => {
                    if (decoded.password === user.data.password) {
                        // renew authToken cookie
                        res.cookie(config.authToken.cookieName, authToken, { 
                            expires: new Date(Date.now() + config.authToken.cookieExpires), // expires in 14 day
                            httpOnly: false,
                            signed: false,
                            secure: false,
                        });
                        next();
                    } else {
                        response.error(res, 500, "Failed to authenticate token.");
                    }
                })
                .catch(error => {
                    response.error(res, 500, error);
                });
            }
        });
    } else {
        response.error(res, 401, "Unauthorized");
    }
};
