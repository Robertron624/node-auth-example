import express from 'express';

const router = express.Router();


router.post('/users', (req, res) => {
    res.send('Hello World! from user.routes.ts');
});

export default router;