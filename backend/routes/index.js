const express = require('express');
const router = express.Router();
const auth = require('./auth');
const transaction = require('./transaction');
const {authenticate} =  require('../middleware/auth');

router.use('/auth' , auth);
router.use('/transaction' , authenticate ,  transaction);

module.exports = router;