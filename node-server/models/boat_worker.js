'use strict';
module.exports = (sequelize, DataTypes) => {
  var boat_worker = sequelize.define('boat_worker', {
    boat_id: DataTypes.INTEGER,
    worker_id: DataTypes.INTEGER
  }, {});
  boat_worker.associate = function(models) {
    // associations can be defined here
  };
  return boat_worker;
};