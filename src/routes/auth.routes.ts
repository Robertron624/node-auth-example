import express from 'express';

const router = express.Router();

router.post('/auth', (req, res) => {
    res.send('Hello World! from auth.routes.ts');
});

export default router;