module.exports = {
    secret: 'supersecret',
    authToken: {
        expires: 86400, // expires in 1 day
        cookieExpires: 86400 * 14, // expires in 14 day
        cookieName: "authToken",
    },
};