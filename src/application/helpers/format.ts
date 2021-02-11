import config from 'config';
import fs from 'fs';

export const regexUUid = '[a-f\\d]{8}-[a-f\\d]{4}-[a-f\\d]{4}-[a-f\\d]{4}-[a-f\\d]{12}';
export const regexPassword = new RegExp(
	`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{${config.get(
		'USER_PASSWORD_MIN_SIZE',
	)},})`,
);

export const isValidUuid = (id: string): boolean => {
	const regex = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
	if (regex.test(id)) {
		return true;
	}
	return false;
};

export const isValidPassword = (password: string): boolean => {
	if (exports.regexPassword.test(String(password))) {
		return true;
	}
	return false;
};

export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (emailRegex.test(String(email).toLowerCase())) {
		return true;
	}
	return false;
};

export const isValidUrl = (url: string): boolean => {
	const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm;
	if (urlRegex.test(String(url).toLowerCase())) {
		return true;
	}
	return false;
};

export const isNumber = (value: unknown): boolean => {
	const number = Number(value);
	return typeof number === 'number' && Number.isFinite(number);
};

export const isOddNumber = (number: number): boolean => {
	if (number % 2) {
		return true;
	}
	return false;
};

export const capitalizeFirstLetter = (value: string): string => {
	return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
};

export const isFile = (filePath: string): boolean => fs.statSync(filePath).isFile();

export const isValidJwtToken = (token: string): boolean => {
	const tokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
	if (tokenRegex.test(String(token))) {
		return true;
	}
	return false;
};
