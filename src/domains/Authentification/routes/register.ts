import { Router } from 'express';
import checkBodySchema from '../../../application/middlewares/joi';
import { register } from '../controllers/register';
import { login } from '../controllers/login';
import { loginSchema, registerSchema } from '../entities/user.schema';

const router = Router();

router.post('/auth/register', checkBodySchema(registerSchema), register);
router.post('/auth/login', checkBodySchema(loginSchema), login);

module.exports = router;
