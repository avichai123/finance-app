const express = require('express');
const router = express.Router();
const transaction = require('../controller/transactionController');

router.post('/' , transaction.addTransaction);
router.delete('/'  , transaction.removeTransaction);
router.get('/'  , transaction.getAllTransactionByMonth);

module.exports = router;