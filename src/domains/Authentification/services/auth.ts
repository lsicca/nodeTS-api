import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcrypt';

import { AuthResponseModel } from '../entities/auth.interface';
import { UserAddModel, UserModel, UserViewModel } from '../entities/user.interface';
import { insertUser, selectUserByEmail } from '../repositories/user';
import AppError from '../../../application/errors/appError';
import { CREDENTIALS_INVALID } from '../errors/authErrors.json';
import { manageSequelizeError } from '../../../application/helpers/sequelize';

const comparePasswords = async (
	passwordHashed: string,
	passwordToCompare: string,
): Promise<boolean> => {
	return bcrypt.compareSync(passwordHashed, passwordToCompare);
};

const createAuthToken = (email: string, id: string): string => {
	return jwt.sign(
		{
			email,
			id,
		},
		String(process.env.JWT_KEY),
		{ expiresIn: `${config.get('JWT_EXPIRATIONTIME_HOUR')}h` },
	);
};

export const buildAuthResponse = (user: UserViewModel): AuthResponseModel => {
	return {
		token: createAuthToken(user.email, user.id),
		expiresIn: Number(config.get('JWT_EXPIRATIONTIME_HOUR')) * 3600,
		profile: user,
	};
};

export const logUser = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<UserModel> => {
	const user = await selectUserByEmail(email);
	if (!user) {
		throw new AppError(CREDENTIALS_INVALID);
	}
	if (!(await comparePasswords(password, user.password))) {
		throw new AppError(CREDENTIALS_INVALID);
	}
	return user;
};

export const registerUser = async (userToCreate: UserAddModel): Promise<UserModel> => {
	userToCreate.password = await bcrypt.hash(userToCreate.password, 10);
	let userCreated;
	try {
		userCreated = await insertUser(userToCreate);
	} catch (err) {
		const error = await manageSequelizeError(err);
		throw error;
	}
	return userCreated;
};
