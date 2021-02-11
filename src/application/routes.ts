import { Router } from 'express';
import * as fs from 'fs';
import config from 'config';
import { basename } from 'path';
import { isFile } from './helpers/format';

const router = Router();

fs.readdirSync(`${__dirname}/../domains`)
	.filter((file) => {
		return !isFile(`${__dirname}/../domains/${file}`);
	})
	.forEach((folder) => {
		if (fs.existsSync(`${__dirname}/../domains/${folder}/routes`)) {
			fs.readdirSync(`${__dirname}/../domains/${folder}/routes`).forEach((route) => {
				if (isFile(`${__dirname}/../domains/${folder}/routes/${route}`)) {
					const routes = require(`${__dirname}/../domains/${folder}/routes/${route}`);
					router.use(`/api/${config.get('APP_VERSION')}/`, routes);
				} else {
					fs.readdirSync(`${__dirname}/../domains/${folder}/routes/${route}`).forEach((file) => {
						if (isFile(`${__dirname}/../domains/${folder}/routes/${route}/${file}`)) {
							const routes = require(`${__dirname}/../domains/${folder}/routes/${route}/${file}`);
							router.use(
								`/api/${config.get('APP_VERSION')}/${route}/${basename(file, '.js')}`,
								routes,
							);
						}
					});
				}
			});
		}
	});

export default router;
