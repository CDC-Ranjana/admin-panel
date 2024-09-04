const express = require('express');
const { addNewAdmin, loginUser, editNewAdmin, deleteNewAdmin } = require('../controllers/userController');
const router = express.Router();

router.post('/add-new-user', addNewAdmin); // here super admin can add more admin under him or her 
router.put("/edit/:id", editNewAdmin)  // super admin can edit the details about admin  
router.delete("/delete/:id", deleteNewAdmin) // super admin can delete the details about admin
router.post('/login', loginUser);  // login controller for super admin only 

module.exports = router;
