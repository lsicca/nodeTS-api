import models from '../../../application/models';
import { UserAddModel, UserModel } from '../entities/user.interface';

export const insertUser = async (newUser: UserAddModel): Promise<UserModel> =>
	models.User.create(newUser);

export const selectUserByEmail = async (email: string): Promise<UserModel> =>
	models.User.findOne({ where: { email } });
