import express from 'express';
import { addFood, getFoodByCategory } from '../controller/food.controller.js';


const router = express.Router();

router.post('/addFood',addFood);
router.get('/getFood/:categoryName',getFoodByCategory);

export default router;