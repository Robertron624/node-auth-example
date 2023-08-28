import express from 'express';
import user from './user.routes';
import auth from './auth.routes';

const router = express.Router();

router.get('/api', (req, res) => {
    res.send('Hello World!');
});

router.get('/healthcheck', (req, res) => {
    res.sendStatus(200);
});

router.use("/api", user);
router.use("/api", auth);

export default router;