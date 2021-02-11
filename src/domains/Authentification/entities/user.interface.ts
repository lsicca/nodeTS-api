import sequelize from 'sequelize';

export interface UserAddModel {
	id?: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role?: string;
	passwordToken?: string;
}

export interface UserModel extends sequelize.Model<UserModel, UserAddModel> {
	id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: string;
	passwordToken: string;
	createdAt: string;
	updatedAt: string;
}

export interface UserViewModel {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	createdAt?: string;
}
