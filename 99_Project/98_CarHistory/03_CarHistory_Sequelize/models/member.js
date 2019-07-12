/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('member', {
		mno: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		id: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		comments: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'member'
	});
};
