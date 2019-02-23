const express = require('express');
const auth = require('../auth');
const database = require('../database');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  if (auth.isRequestAuthorized(req, res)) {
    database.connection().query("SELECT * from users", function (error, results, fields) {
      if (error) {
        res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        //If there is no error, all is good and response is 200OK.
      }
      database.close();
    });
  } else {
    auth.sendUnauthorizedResponse(res);
  }
});

module.exports = router;
