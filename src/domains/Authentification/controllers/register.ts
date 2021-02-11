import { Request, Response } from 'express';
import { sendError, sendSuccess } from '../../../application/helpers/response';
import { sanitizeInstance } from '../../../application/helpers/sanitizer';
import { UserAddModel } from '../entities/user.interface';
import { userProfileSchema } from '../entities/user.schema';
import { buildAuthResponse, registerUser } from '../services/auth';

export const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const userCreated = await registerUser(req.locals.body as UserAddModel);
		const userSanitized = await sanitizeInstance(userCreated, userProfileSchema);
		const authResponse = await buildAuthResponse(userSanitized);
		sendSuccess(res, authResponse);
	} catch (err) {
		sendError(res, err);
	}
};
