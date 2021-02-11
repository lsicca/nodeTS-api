import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import config from 'config';

const env: { [name: string]: any } = {};

fs.readdirSync('./config')
	.filter((file: string) => {
		return file.indexOf('.') !== 0 && path.extname(file) === '.env';
	})
	.forEach((file: string) => {
		const envConfig = dotenv.parse(fs.readFileSync(`config/${file}`));
		Object.keys(envConfig).forEach((key) => {
			process.env[key] = envConfig[key];
		});
		env[path.basename(file, '.env')] = {
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			dialect: 'postgres',
			logging: config.get('DB_LOG'),
			define: {
				underscored: false,
				freezeTableName: true,
			},
		};
	});

env.travis = {
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: 'postgres',
	define: {
		underscored: false,
		freezeTableName: true,
	},
};

export default env;
