const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const auth = require('../middleware/auth');

router.post('/login' , authController.login);
router.post('/register' , authController.register);
router.get('/check' , auth.authenticate , (req , res) => {
    res.json("approved");
});

module.exports = router;