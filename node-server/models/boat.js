'use strict';
module.exports = (sequelize, DataTypes) => {
  var Boat = sequelize.define('boat', {
    name:DataTypes.STRING,
    type:DataTypes.STRING,
    length:DataTypes.DECIMAL,
    work_description:DataTypes.STRING,
    photo:DataTypes.STRING,
    arrival_date:DataTypes.DATE,
    delivery_date:DataTypes.DATE,
  }, {    
    freezeTableName: true,
    tableName: 'boat',
  });
  Boat.associate = function(models) {
    // associations can be defined here
    Boat.hasMany(models.boat_worker, { foreignKey: 'boat_id'} );
  };
  return Boat;
};