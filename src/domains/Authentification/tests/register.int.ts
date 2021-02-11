/* eslint-disable no-undef,no-console */
import request from 'supertest';
import config from 'config';

import app from '../../../application/app';

import { closeSequelize } from '../../../application/helpers/sequelize';
import models from '../../../application/models';
import users from '../seeders/users.json';
import { userProfileSchema } from '../entities/user.schema';
import { MISSING_FIELD, INVALID_FIELD, CONFLICT } from '../../../application/errors/errors.json';

const URL = `/api/${config.get('APP_VERSION')}/auth/register`;
const INVALID_PASSWORDS = [
	'P@ssw0d',
	'@Zertyuiopqsdf',
	'0Zertyuiopqsdf',
	'@0zertyuiopqsdf',
	'@ZERTYUIOP0',
];

beforeEach(async () => {
	await models.User.destroy({ truncate: { cascade: true } });
	await models.User.bulkCreate(users);
});

afterAll(async () => {
	await closeSequelize();
});

describe(`Register an user`, () => {
	const user = {
		email: 'test@isicca.fr',
		password: 'P@ssw0rd',
		firstName: 'First name',
		lastName: 'Last name',
	};

	it(`should not register an user (missing email)`, async () => {
		const userToRegister = { ...user, email: undefined };
		const res = await request(app).post(URL).send(userToRegister);
		expect(res.status).toStrictEqual(400);
		expect(res.body).toStrictEqual({
			status: MISSING_FIELD.httpCode,
			message: MISSING_FIELD.message,
			reference: 'email',
		});
	});

	it(`should not register an user (missing password)`, async () => {
		const userToRegister = { ...user, password: undefined };
		const res = await request(app).post(URL).send(userToRegister);
		expect(res.status).toStrictEqual(400);
		expect(res.body).toStrictEqual({
			status: MISSING_FIELD.httpCode,
			message: MISSING_FIELD.message,
			reference: 'password',
		});
	});

	it(`should not register an user (missing firstName)`, async () => {
		const userToRegister = { ...user, firstName: undefined };
		const res = await request(app).post(URL).send(userToRegister);
		expect(res.status).toStrictEqual(400);
		expect(res.body).toStrictEqual({
			status: MISSING_FIELD.httpCode,
			message: MISSING_FIELD.message,
			reference: 'firstName',
		});
	});

	it(`should not register an user (missing lastName)`, async () => {
		const userToRegister = { ...user, lastName: undefined };
		const res = await request(app).post(URL).send(userToRegister);
		expect(res.status).toStrictEqual(400);
		expect(res.body).toStrictEqual({
			status: MISSING_FIELD.httpCode,
			message: MISSING_FIELD.message,
			reference: 'lastName',
		});
	});

	it(`should not register an user (invalid email)`, async () => {
		const userToRegister = { ...user, email: 'bademail' };
		const res = await request(app).post(URL).send(userToRegister);
		expect(res.status).toStrictEqual(422);
		expect(res.body).toStrictEqual({
			status: INVALID_FIELD.httpCode,
			message: INVALID_FIELD.message,
			reference: 'email',
		});
	});

	INVALID_PASSWORDS.forEach((invalidPassword: string) => {
		it(`should not register an user (invalid email)`, async () => {
			const userToRegister = { ...user, password: invalidPassword };
			const res = await request(app).post(URL).send(userToRegister);
			expect(res.status).toStrictEqual(422);
			expect(res.body).toStrictEqual({
				status: INVALID_FIELD.httpCode,
				message: INVALID_FIELD.message,
				reference: 'password',
			});
		});
	});

	it(`should not register an user (existing email)`, async () => {
		const userToRegister = { ...user, email: users[0].email };
		const res = await request(app).post(URL).send(userToRegister);
		expect(res.status).toStrictEqual(409);
		expect(res.body).toStrictEqual({
			status: CONFLICT.httpCode,
			message: CONFLICT.message,
			reference: 'email',
		});
	});

	it(`should register an user`, async () => {
		const userToRegister = { ...user };
		const res = await request(app).post(URL).send(userToRegister);
		expect(res.status).toStrictEqual(201);
		expect(res.body).toMatchObject({
			token: expect.any(String),
			expiresIn: expect.any(Number),
			profile: expect.any(Object),
		});
		expect(res.body.profile).toMatchSchema(userProfileSchema);
	});
});
