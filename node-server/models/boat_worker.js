/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('boat_worker', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    boat_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'boat',
        key: 'id'
      }
    },
    worker_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'worker',
        key: 'id'
      }
    }
  }, {
    tableName: 'boat_worker'
  });
};
