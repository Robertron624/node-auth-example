import express from 'express';
import { Request, Response } from 'express';
import validateResource from '../middleware/validateResource';
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../schema/user.schema';
import { createUserHandler, forgotPasswordHandler, getCurrentUserHandler, resetPasswordHandler, verifyUserHandler } from '../controllers/user.controller';
import requireUser from '../middleware/requireUser';

const router = express.Router();


router.post('/users', validateResource(createUserSchema), createUserHandler);

router.post('/users/verify/:id/:verificationCode', validateResource(verifyUserSchema),  verifyUserHandler);

router.post('/users/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler);

router.post('/users/resetpassword/:id/:passwordResetCode', validateResource(resetPasswordSchema), resetPasswordHandler)

router.get('/users/me', requireUser, getCurrentUserHandler)

export default router;