module.exports = (sequelize, type) => {
    return sequelize.define('metrics', {
		id: {
			type: type.INTEGER.UNSIGNED,
			allowNull: false,
            autoIncrement: true,
			primaryKey: true,
			fieldName: 'id'
		},
        user: {
            type: type.STRING(45),
            allowNull: false,
            fieldName: "user"
        },
        count: {
			type: type.INTEGER.UNSIGNED,
			allowNull: false,
			fieldName: 'count'
		},
		timestamp: {
			type: "TIMESTAMP",
			allowNull: false,
			fieldName: "timestamp"
		}
	},
	{
		timestamps: false,
		engine: 'InnoDB',
		charset: 'latin1',
		tableName: 'metrics'
	});
};
