/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('worker', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'worker',
    classMethods: {
      associate: function (models) {
// here in the models object you have all the defined models, and can associate each of them like you would manualy do
        models['boat'].belongsToMany(worker, { through: boat_worker, foreignKey: 'boat_id' });
      }
    }
  });
};
