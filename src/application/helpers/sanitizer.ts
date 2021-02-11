import Joi from 'joi';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const sanitizeInstance = async (data: any, schema: Joi.Schema): Promise<any> => {
	if (data === null) {
		return {};
	}
	const { value } = await schema.validate(data.dataValues, {
		abortEarly: false,
		stripUnknown: true,
	});
	return value;
};

export const sanitizeInstances = async (datas: [any], schema: Joi.Schema): Promise<any[]> =>
	Promise.all(datas.map((data) => sanitizeInstance(schema, data)));
