/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('boat', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('sail','motor'),
      allowNull: false
    },
    length: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    work_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    arrival_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, 
  {
    tableName: 'boat',
    classMethods: {
      associate: function (models) {
// here in the models object you have all the defined models, and can associate each of them like you would manualy do
        models['worker'].belongsToMany(boat, { through: boat_worker, foreignKey: 'worker_id' });
      }
    }
  });
};
