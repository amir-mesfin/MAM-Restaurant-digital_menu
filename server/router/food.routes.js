import express from 'express';
import { addFood, deleteFood, getFoodByCategory, updateFood } from '../controller/food.controller.js';


const router = express.Router();

router.post('/addFood',addFood);
router.get('/getFood/:categoryName',getFoodByCategory);
router.put('/updateFood/:foodId',updateFood);
router.delete('/deleteFood/:foodId',deleteFood);

export default router;