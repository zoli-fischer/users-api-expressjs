'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.runSql('INSERT INTO users (email, password) VALUES (?, PASSWORD(?))', ['test@test.com', 'password'], callback);
};

exports.down = function(db, callback) {
  db.runSql('DELETE FROM users WHERE email = ?', ['test@test.com'], callback);
};

exports._meta = {
  "version": 1
};
