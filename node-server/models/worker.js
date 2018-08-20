'use strict';
module.exports = (sequelize, DataTypes) => {
  var worker = sequelize.define('worker', {
    name: DataTypes.STRING,
    phone:  DataTypes.STRING,
    photo:DataTypes.STRING
  }, 
  {    
    freezeTableName: true,
    tableName: 'worker',
  });
  worker.associate = function(models) {
    // associations can be defined here
    worker.hasMany(models.boat_worker, { foreignKey: 'worker_id'} );
  };
  return worker;
};