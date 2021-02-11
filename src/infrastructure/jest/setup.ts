import expect from 'expect';
import dayjs from 'dayjs';
import Joi from 'joi';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace jest {
		// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
		interface Matchers<R> {
			toMatchSchema(expected: Joi.ObjectSchema): jest.CustomMatcherResult;
			toBeTypeOrNull(expected: any): jest.CustomMatcherResult;
			toEqualDate(expected: Date): jest.CustomMatcherResult;
			toBeIsoDate(expected: Date): jest.CustomMatcherResult;
		}
	}
}

expect.extend({
	toBeISODate(received: any) {
		if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(received)) {
			return {
				pass: false,
				message: () => `Expected ${received} to be a valid ISO date string`,
			};
		}
		const d = new Date(received);
		return d.toISOString() === received
			? { pass: true, message: () => `Expected ${received} not to be a valid ISO date string` }
			: { pass: false, message: () => `Expected ${received} to be a valid ISO date string` };
	},

	toEqualDate(received: any, expected: Date) {
		const pass =
			dayjs(received).isValid() && dayjs(expected).isValid() && dayjs(received).isSame(expected);
		if (pass) {
			return {
				message: () => 'Ok',
				pass: true,
			};
		}
		return {
			message: () => `expected ${expected} to be equal to ${received}`,
			pass: false,
		};
	},

	toBeTypeOrNull(received: any, expected: any) {
		let pass = false;
		if (received === null) {
			pass = true;
		}
		if (expected === String && (typeof received === 'string' || received instanceof String)) {
			pass = true;
		}
		if (expected === Number && (typeof received === 'number' || received instanceof Number)) {
			pass = true;
		}
		if (expected === Function && (typeof received === 'function' || received instanceof Function)) {
			pass = true;
		}
		if (expected === Object && typeof received === 'object') {
			pass = true;
		}
		if (expected === Boolean && typeof received === 'boolean') {
			pass = true;
		}
		if (pass) {
			return {
				message: () => 'Ok',
				pass: true,
			};
		}
		return {
			message: () => `expected ${received} to be ${expected} type or null`,
			pass: false,
		};
	},

	toMatchSchema(received: any, expected: Joi.ObjectSchema) {
		const { error } = expected.validate(received, { abortEarly: true });
		if (error) {
			return {
				message: () => `expected to be a valid schema (${error.details[0].context?.label})`,
				pass: false,
			};
		}
		return {
			message: () => 'Ok',
			pass: true,
		};
	},
});
