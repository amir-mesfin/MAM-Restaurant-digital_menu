import express from 'express';
import { addFood } from '../controller/food.controller.js';


const router = express.Router();

router.post('/addFood',addFood);

export default router;