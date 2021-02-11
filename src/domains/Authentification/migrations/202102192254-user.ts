import sequelize, { UUID, UUIDV4, STRING, DATE, NOW } from 'sequelize';

module.exports = {
	up: async (queryInterface: sequelize.QueryInterface) => {
		await queryInterface.createTable('User', {
			id: {
				type: UUID,
				defaultValue: UUIDV4,
				primaryKey: true,
			},
			email: { type: STRING, allowNull: false, unique: true },
			password: { type: STRING, allowNull: false },
			firstName: { type: STRING, allowNull: false },
			lastName: { type: STRING, allowNull: true },
			passwordToken: { type: STRING, allowNull: true },
			role: {
				type: STRING,
				allowNull: true,
				validate: {
					isIn: [['user', 'admin']],
				},
				defaultValue: 'user',
			},
			createdAt: { type: DATE(6), defaultValue: NOW },
			updatedAt: { type: DATE(6), defaultValue: NOW },
		});
	},

	down: (queryInterface: sequelize.QueryInterface) => {
		return queryInterface.dropTable('User');
	},
};
