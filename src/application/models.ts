import * as fs from 'fs';
import path from 'path';

import { capitalizeFirstLetter, isFile } from './helpers/format';
import { getSequelize } from './helpers/sequelize';

require('dotenv').config({
	path: path.resolve('config', `${process.env.NODE_ENV}.env`),
});

const seq = getSequelize();

const models: { [name: string]: any } = {};

fs.readdirSync(`${__dirname}/../domains`)
	.filter((file) => {
		return !isFile(`${__dirname}/../domains/${file}`);
	})
	.forEach((folder) => {
		if (
			fs.existsSync(`${__dirname}/../domains/${folder}/entities`) &&
			!isFile(`${__dirname}/../domains/${folder}/entities`)
		) {
			fs.readdirSync(`${__dirname}/../domains/${folder}/entities`).forEach((file) => {
				if (file.includes('.model')) {
					const model = require(`${__dirname}/../domains/${folder}/entities/${file}`)(seq);
					models[capitalizeFirstLetter(model.name)] = model;
				}
			});
		}
	});

Object.keys(models).forEach((modelName) => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

export default models;
