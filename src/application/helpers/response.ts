import { Response } from 'express';
import AppError from '../errors/appError';
import HttpError from '../errors/httpError';
import InternalError from '../errors/internalError';

const METHOD_TO_HTTPCODE: Map<string, number> = new Map([
	['GET', 200],
	['POST', 201],
	['PATCH', 200],
	['PUT', 200],
	['DELETE', 204],
]);

export const sendError = (res: Response, error: AppError | HttpError | InternalError): void => {
	if (!error.status) {
		error = new InternalError();
	}
	res.status(error.status).json(error);
};

export const sendSuccess = (res: Response, result: unknown = null): void => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const httpCode = METHOD_TO_HTTPCODE.get(res.req!.method);
	res.status(httpCode || 500).json(result);
};
