import Joi from 'joi';
import { regexPassword } from '../../../application/helpers/format';

export const registerSchema = Joi.object({
	email: Joi.string().required().email(),
	password: Joi.string().required().pattern(regexPassword),
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
});

export const loginSchema = Joi.object({
	email: Joi.string().required().email(),
	password: Joi.string().required().pattern(regexPassword),
});

export const userProfileSchema = Joi.object({
	id: Joi.string().required().uuid(),
	email: Joi.string().required().email(),
	firstName: Joi.string().required(),
	role: Joi.string().required(),
	lastName: Joi.string().required(),
});
