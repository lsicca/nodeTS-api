import config from 'config';

module.exports = {
	swaggerDefinition: {
		info: {
			version: config.get('APP_VERSION'),
			title: config.get('APP_TITLE'),
			description: config.get('APP_DESCRIPTION'),
			termsOfService: 'None',
			contact: {
				name: 'Jacky Thierry',
				email: 'jthierry@isicca.fr',
			},
		},
		host: `localhost:${process.env.PORT || config.get('APP_PORT')}`,
		basePath: `/api/${config.get('APP_VERSION')}/`,
		schemes: ['http', 'https'],
		consumes: ['application/json'],
		produces: ['application/json'],
		swagger: '2.0',
	},
	apis: [
		'./swagger/definitions.ts',
		'./dist/domains/**/routes/*.js',
		'./dist/domains/**/entities/*.js',
	],
};
