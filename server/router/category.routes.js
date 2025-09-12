import express from 'express';
import {addCatagory} from '../controller/category.controller.js';
const router = express.Router();

router.post('/addCategory',addCatagory);

export default router;