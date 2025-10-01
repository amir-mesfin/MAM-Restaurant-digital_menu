import express from 'express';
import {addCatagory,
        showCatagory,
        updateCategory,
        deleteCategory,
        getCategory
} from '../controller/category.controller.js';
const router = express.Router();

router.get('/getCategory/:categoryID', getCategory);
router.post('/addCategory',addCatagory);
router.get('/showCatagory',showCatagory);
router.put('/categoryUpdate/:categoryID',updateCategory);
router.delete('/categoryDelete/:categoryID',deleteCategory);

export default router;