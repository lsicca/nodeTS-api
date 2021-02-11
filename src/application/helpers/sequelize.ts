// @ts-nocheck
import sequelize, { Sequelize } from 'sequelize';

import AppError from '../errors/appError';
import { CONFLICT, MISSING_FIELD } from '../errors/errors.json';

let db: Sequelize;

export const generateSequelize = (): Sequelize => {
	if (db) {
		return db;
	}
	const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
	if (!DB_NAME || !DB_USER || !DB_PASSWORD) {
		// eslint-disable-next-line no-console
		console.error('Missing database name user or password in env variables');
		process.exit(1);
	}

	db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		storage: process.env.DB_PATH,
		dialect: 'postgres',
		logging: Boolean(process.env.DB_LOG),
		define: {
			underscored: false,
			freezeTableName: true,
		},
	});
	return db;
};

export const getSequelize = (): Sequelize => {
	if (!db) {
		generateSequelize();
	}
	return db;
};

export const closeSequelize = async (): Promise<void> => {
	if (db) {
		await db.close();
	}
};

// TODO : Add validatorKey to ValidationErrorItem ts definition
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const manageSequelizeError = async (error: sequelize.ValidationError) => {
	if (error.message === 'Validation error') {
		if (error.errors[0].validatorKey === 'not_unique') {
			return new AppError(CONFLICT, error.errors[0].path);
		}
		if (error.errors[0].validatorKey === 'is_null') {
			return new AppError(MISSING_FIELD, error.errors[0].path);
		}
	}
	return error;
};
