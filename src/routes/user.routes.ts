import express from 'express';
import { Request, Response } from 'express';
import validateResource from '../middleware/validateResource';
import { createUserSchema, forgotPasswordSchema, verifyUserSchema } from '../schema/user.schema';
import { createUserHandler, forgotPasswordHandler, verifyUserHandler } from '../controllers/user.controller';

const router = express.Router();


router.post('/users', validateResource(createUserSchema), createUserHandler);

router.post('/users/verify/:id/:verificationCode', validateResource(verifyUserSchema),  verifyUserHandler);

router.post('/users/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler);

export default router;