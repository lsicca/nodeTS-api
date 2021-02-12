import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import * as helmet from 'helmet';
import config from 'config';
import morgan from 'morgan';
import jwt from 'express-jwt';

import routes from './routes';

import { generateSequelize } from './helpers/sequelize';
import HttpError from './errors/httpError';
import { AUTHTOKEN_MISSING, AUTHTOKEN_INVALID, AUTHTOKEN_EXPIRED } from './errors/errors.json';
import { sendError } from './helpers/response';
import AppError from './errors/appError';
import InternalError from './errors/internalError';

declare module 'express-serve-static-core' {
	// eslint-disable-next-line no-shadow
	interface Request {
		user: {
			email: string;
			id: string;
			iat: number;
			exp: number;
		};
		locals: {
			baseUrl: string;
			body: any;
		};
	}
}

const cors = require('cors');

const corsOptions = {
	origin: JSON.parse(String(process.env.CORS_ORIGIN)),
};

const app = express();

app.on('close', () => {
	const sequelize = generateSequelize();
	sequelize.close();
});

app.use(helmet.default());

app.use(bodyParser.json());
app.use(cors(corsOptions));

if (process.env.LOG_CONSOLE === 'true') {
	app.use(morgan('dev'));
}

app.use((req: Request, res: Response, next: NextFunction) => {
	req.locals = {
		baseUrl: `/api/${config.get('APP_VERSION')}`,
		body: {},
	};
	next();
});

app.use(
	jwt({ secret: String(process.env.JWT_KEY), algorithms: ['HS256'] }).unless({
		path: [/auth/, /swagger.json/],
	}),
);

app.use('/', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	let error: AppError | HttpError | InternalError = new InternalError();
	if (err.message === 'No authorization token was found') {
		error = new HttpError(AUTHTOKEN_MISSING);
	}
	if (err.message === 'invalid signature') {
		error = new HttpError(AUTHTOKEN_INVALID);
	}
	if (err.message === 'jwt expired') {
		error = new HttpError(AUTHTOKEN_EXPIRED);
	}
	sendError(res, error);
	next();
});

export default app;
