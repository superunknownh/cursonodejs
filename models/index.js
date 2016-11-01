'use strict';

var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(module.filename);
var Sequelize = require('sequelize');
var config = require('../config/mysql.json');
var sequelize = new Sequelize(config);
var db = [];

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
