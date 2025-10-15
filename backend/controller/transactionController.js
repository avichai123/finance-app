const { Installment , Transaction, sequelize} = require('../models');
const { getAllTransaction , formattedTransactionsService } = require('../services/transactionService');
const { addMonths } = require('date-fns');

const addTransaction = async(req , res) => {
    const t = await sequelize.transaction();
    try{
        const {
            userId,
            categoryId,
            type,
            amount,
            date,
            notes,
            installment
        } = req.body;
        if(!userId || !type || !amount || !date || !categoryId){
            return res.status(409).json({message:'missing fileds!'});
        }

        if(type !== 'income' && type !== 'expense'){
             return res.status(401).json({message:"type is not correct"});
        }

        const transaction = await Transaction.create({
            userId,
            type,
            categoryId,
            amount,
            date,
            notes
        },{transaction:t});

        let firstInstallment = null;

        if (installment && installment > 1){
            const installments = [];
            const startDate = new Date(date);
        
            for(let i = 0; i < installment; i++){

                const dueDate = addMonths(startDate , i);

                installments.push({
                    transactionId:transaction.id,
                    amount:amount / installment,
                    dueDate
                });
            }

           const createdInstallment = await Installment.bulkCreate(installments , {transaction:t});
           firstInstallment = createdInstallment[0];
    }

    await t.commit();

    res.status(200).json({
            message:'Transaction create successsfuly',
            transaction,
            firstInstallment:firstInstallment ? firstInstallment : null
        });
    }catch(error){
        await t.rollback();
        res.status(500).json({message:error.message});
    }
}

const removeTransaction = async(req , res) => {

}

const getAllTransactionByMonth = async(req , res) => {
    try{
        const date = parseInt(req.query.date);
        const now = new Date();
        const month = date ? date : now.getMonth() + 1;
        const year = now.getFullYear();

        const transactions = await getAllTransaction(month , year);

        const formattedTransactions = formattedTransactionsService(transactions , month , year);

        res.status(200).json(formattedTransactions);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports = {
    addTransaction,
    removeTransaction,
    getAllTransactionByMonth
}