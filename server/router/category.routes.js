import express from 'express';
import {addCatagory,
        showCatagory,
        updateCategory,
        deleteCategory,
        getCategory
} from '../controller/category.controller.js';
const router = express.Router();

router.post('/addCategory',addCatagory);
router.get('/showCatagory',showCatagory);
router.put('/categoryUpdate/:categoryID',updateCategory);
router.delete('/categoryDelete/:categoryID',deleteCategory);
router.get('/getCategory/:categoryID',getCategory);


export default router;