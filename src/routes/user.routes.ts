import express from 'express';
import { Request, Response } from 'express';
import validateResource from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { createUserHandler } from '../controllers/user.controller';

const router = express.Router();


router.post('/users', validateResource(createUserSchema), createUserHandler);

export default router;