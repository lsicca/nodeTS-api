import { UserViewModel } from './user.interface';

export interface AuthResponseModel {
	token: string;
	expiresIn: number;
	profile: UserViewModel;
}
