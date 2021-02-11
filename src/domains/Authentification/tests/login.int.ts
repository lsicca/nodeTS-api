/* eslint-disable no-undef,no-console */
import request from 'supertest';
import config from 'config';

import app from '../../../application/app';

import { closeSequelize } from '../../../application/helpers/sequelize';
import models from '../../../application/models';
import users from '../seeders/users.json';
import { userProfileSchema } from '../entities/user.schema';
import { MISSING_FIELD, INVALID_FIELD } from '../../../application/errors/errors.json';

const URL = `/api/${config.get('APP_VERSION')}/auth/login`;

beforeEach(async () => {
	await models.User.destroy({ truncate: { cascade: true } });
	await models.User.bulkCreate(users);
});

afterAll(async () => {
	await closeSequelize();
});

describe(`Login an user`, () => {
	const user = {
		email: users[0].email,
		password: 'P@ssw0rd',
	};

	it(`should not login an user (missing email)`, async () => {
		const userToLog = { password: user.password };
		const res = await request(app).post(URL).send(userToLog);
		expect(res.status).toStrictEqual(400);
		expect(res.body).toStrictEqual({
			status: MISSING_FIELD.httpCode,
			message: MISSING_FIELD.message,
			reference: 'email',
		});
	});

	it(`should not login an user (missing password)`, async () => {
		const userToLog = { email: user.email };
		const res = await request(app).post(URL).send(userToLog);
		expect(res.status).toStrictEqual(400);
		expect(res.body).toStrictEqual({
			status: MISSING_FIELD.httpCode,
			message: MISSING_FIELD.message,
			reference: 'password',
		});
	});

	it(`should not login an user (invalid email)`, async () => {
		const userToLog = { email: 'bademail' };
		const res = await request(app).post(URL).send(userToLog);
		expect(res.status).toStrictEqual(422);
		expect(res.body).toStrictEqual({
			status: INVALID_FIELD.httpCode,
			message: INVALID_FIELD.message,
			reference: 'email',
		});
	});

	it(`should login an user`, async () => {
		const userToLog = { ...user };
		const res = await request(app).post(URL).send(userToLog);
		expect(res.status).toStrictEqual(201);
		expect(res.body).toMatchObject({
			token: expect.any(String),
			expiresIn: expect.any(Number),
			profile: expect.any(Object),
		});
		expect(res.body.profile).toMatchSchema(userProfileSchema);
	});
});
