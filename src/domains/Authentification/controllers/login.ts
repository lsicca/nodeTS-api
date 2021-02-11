import { Request, Response } from 'express';
import { sendError, sendSuccess } from '../../../application/helpers/response';
import { buildAuthResponse, logUser } from '../services/auth';
import { sanitizeInstance } from '../../../application/helpers/sanitizer';
import { userProfileSchema } from '../entities/user.schema';

export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const userLogged = await logUser(req.locals.body);
		const userSanitized = await sanitizeInstance(userLogged, userProfileSchema);
		const loginResponse = await buildAuthResponse(userSanitized);
		sendSuccess(res, loginResponse);
	} catch (err) {
		sendError(res, err);
	}
};
