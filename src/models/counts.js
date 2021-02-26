module.exports = (sequelize, type) => {
    return sequelize.define("counts", {
        user: {
            type: type.STRING(45),
            allowNull: false,
            primaryKey: true,
            fieldName: "user"
        },
        count: {
            type: type.INTEGER.UNSIGNED,
            allowNull: false,
            fieldName: "count"
        },
        timestamp: {
            type: "TIMESTAMP",
            allowNull: false,
            fieldName: "timestamp"
		}
	},
	{
        timestamps: false,
        engine: "InnoDB",
        charset: "latin1",
        tableName: "counts"
	});
};
