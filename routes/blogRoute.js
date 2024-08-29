const express = require('express');
const { createBlog, getAllBlogs, editBlog, deleteBlog } = require('../controllers/blogController');
const upload = require('../middleware/multer');
const uploadMultipleFile = require('../middleware/upload');
const router = express.Router();


// for creating blogs or recent activities
router.post('/create', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 5 }]), uploadMultipleFile, createBlog);

// for getting all the blogs or recent activities
router.get("/get-blogs", getAllBlogs)

// for editing and updating any particular blogs or recent activities
router.put('/edit/:id', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 5 }]), uploadMultipleFile, editBlog);

// for deleting any particular blogs or recent activities
router.delete('/delete/:id', deleteBlog);
module.exports = router;
