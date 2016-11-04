module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('User', {
			user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
			user_name: {type: DataTypes.STRING },
			user_password: {type: DataTypes.STRING },
			user_fullname: {type: DataTypes.STRING },
			user_description: {type: DataTypes.STRING },
			user_type: {type: DataTypes.INTEGER }
		}, {
			underscored: false,
			timestamps: false,
			tableName: 'users',
			classMethods: {
				associate : function(models) {
					Model.belongsTo(models.UserType, {as: 'UserType', foreignKey: 'user_type'})
				}
			}
		});
	return Model;
}
