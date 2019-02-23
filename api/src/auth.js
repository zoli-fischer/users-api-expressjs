const auth = {};

auth.isRequestAuthorized = (req) => {
    return req.headers.authorization === "Bearer " + req.signedCookies.token;
};

auth.sendUnauthorizedResponse = (res) => {
    res.send(JSON.stringify({ "status": 401, "error": "Unauthorized", "response": null }));
}

module.exports = auth;
