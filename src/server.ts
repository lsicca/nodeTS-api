/* eslint no-console: 0 */
import * as path from 'path';
import * as dotenv from 'dotenv';
import config from 'config';
import http from 'http';
import { generateSequelize } from './application/helpers/sequelize';

import app from './application/app';

dotenv.config({ path: path.resolve('config', `${process.env.NODE_ENV}.env`) });

const port = config.get('APP_PORT');

app.set('port', port);

if (process.env.SWAGGER_ENABLED === 'true') {
	const swaggerJSDoc = require('swagger-jsdoc'); // eslint-disable-line global-require,import/no-extraneous-dependencies
	const swaggerSpec = swaggerJSDoc(require('./infrastructure/swagger/schema'));
	// eslint-disable-line global-require
	app.get('/swagger.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});
}

const server = http.createServer(app);

const sequelize = generateSequelize();
sequelize.authenticate().catch((error: Error) => {
	console.error('Database not accessible');
	console.error(error.message);
	process.exit(1);
});

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
	console.info(`Listening on ${bind}`);
	console.info(new Date().toLocaleString());
}

server.listen(port);
server.on('listening', onListening);
