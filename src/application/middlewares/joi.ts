import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { INVALID_FIELD, MISSING_FIELD, FORBIDDEN_FIELD } from '../errors/errors.json';
import HttpError from '../errors/httpError';
import { sendError } from '../helpers/response';

const checkBodySchema = (schema: Joi.Schema) => {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			if (!schema) {
				throw Error;
			}
			const { value, error } = await schema.validate(req.body, {
				abortEarly: true,
				allowUnknown: true,
				stripUnknown: true,
			});
			if (error) {
				let err;
				switch (error.details[0].type) {
					case 'any.required':
						err = new HttpError(MISSING_FIELD, error.details[0].context?.label);
						break;
					case 'any.unknown':
						err = new HttpError(FORBIDDEN_FIELD, error.details[0].context?.label);
						break;
					default:
						err = new HttpError(INVALID_FIELD, error.details[0].context?.label);
						break;
				}
				throw err;
			}
			req.locals.body = value;
			next();
		} catch (err) {
			sendError(res, err);
		}
	};
};

export default checkBodySchema;
