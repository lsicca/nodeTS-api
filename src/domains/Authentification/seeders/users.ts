import { QueryInterface } from 'sequelize';
// eslint-disable-next-line import/no-useless-path-segments
import users from '../../../domains/Authentification/seeders/users.json';

module.exports = {
	up: (queryInterface: QueryInterface) => {
		return queryInterface.bulkInsert('User', users, {});
	},

	down: (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('User', {}, {});
	},
};
