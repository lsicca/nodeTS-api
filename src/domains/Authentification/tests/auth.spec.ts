/* eslint-disable no-undef,no-console */
import { userProfileSchema } from '../entities/user.schema';
import { buildAuthResponse, logUser, registerUser } from '../services/auth';
import { closeSequelize } from '../../../application/helpers/sequelize';
import models from '../../../application/models';
import users from '../seeders/users.json';

beforeEach(async () => {
	await models.User.destroy({ truncate: { cascade: true } });
	await models.User.bulkCreate(users);
});

afterAll(async () => {
	await closeSequelize();
});

describe(`Compare build auth response`, () => {
	it('should return a good auth reponse', async () => {
		const user = {
			id: '3df5c10d-3f48-4d69-acdd-35636ea6aca1',
			email: 'user@isicca.fr',
			firstName: 'Jacky',
			lastName: 'Thierry',
			role: 'user',
		};
		const authResponse = buildAuthResponse(user);
		expect(authResponse).toMatchObject({
			token: expect.any(String),
			expiresIn: expect.any(Number),
			profile: expect.any(Object),
		});
		expect(authResponse.profile).toMatchSchema(userProfileSchema);
	});
});
describe(`Login an user`, () => {
	it('should not login an user', async () => {
		const user = {
			email: users[0].email,
			password: 'P@ssw0r',
		};
		await expect(logUser(user)).rejects.toThrow();
	});

	it('should login an user (invalid password)', async () => {
		const user = {
			email: users[0].email,
			password: 'P@ssw0rd',
		};
		const userLogged = await logUser(user);
		expect(userLogged).toMatchObject({ id: expect.any(String) });
	});
});

describe(`Register an user`, () => {
	it('should register an user', async () => {
		const userToCreate = {
			email: 'test@isicca.fr',
			password: 'P@ssw0rd',
			firstName: 'Test',
			lastName: 'Test',
		};
		const userCreated = await registerUser(userToCreate);
		expect(userCreated).toMatchObject({ id: expect.any(String) });
	});
});
