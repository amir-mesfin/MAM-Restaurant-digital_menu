import express from 'express';
import {getMe, signin} from '../controller/auth.controller.js'
const router = express.Router();

router.post('/signin', signin);
router.get('/me', getMe);

export default router