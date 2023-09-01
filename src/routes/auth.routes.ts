import express from 'express';
import { createSessionHandler } from '../controllers/auth.controller';
import validateResource from '../middleware/validateResource';
import { createSessionSchema } from '../schema/session.shema';

const router = express.Router();

router.post('/sessions', validateResource(createSessionSchema) , createSessionHandler);

export default router;