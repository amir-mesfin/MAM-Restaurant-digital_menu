import express from 'express';
import {addCatagory,
        showCatagory
} from '../controller/category.controller.js';
const router = express.Router();

router.post('/addCategory',addCatagory);
router.get('/showCatagory',showCatagory);

export default router;