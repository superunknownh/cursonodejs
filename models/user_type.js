module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('UserType', {
		ut_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		ut_name: {type: DataTypes.STRING },
	}, {
		tableName: 'users_types',
		classMethods: {
			associate: function(models) {
				Model.hasMany(models.User, {as: 'User', foreignKey: 'user_type'})
			}
		}
	});
	return Model;
}
