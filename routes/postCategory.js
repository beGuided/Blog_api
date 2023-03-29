const express= require('express');
const router = express.Router();

const {
    getAllCategory, 
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/postCategory')

router.route('/').post(createCategory).get(getAllCategory);
router.route('/:id').get(getCategory).patch(updateCategory).delete(deleteCategory)


module.exports = router