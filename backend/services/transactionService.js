const {Category , Installment , Transaction} = require('../models');
const { Op, where, fn, col } = require('sequelize');

const formattedTransactionsService = (transactions , month , year) =>{
    const formatted = transactions.map(t => {
      const currentMonthInstallments = t.Installments.filter(inst => {
        const due = new Date(inst.dueDate);
        return due.getMonth() + 1 === month && due.getFullYear() === year;
      });

      return {
        id: t.id,
        userId: t.userId,
        type: t.type,
        category: t.Category?.name,
        amount: t.amount,
        date: t.date,
        notes: t.notes,
        hasInstallments: t.Installments.length > 0,
        installments: currentMonthInstallments
      };
    });
    return formatted;
}

const getAllTransaction = async(month , year) => {
    const transactions = await Transaction.findAll({
            include:[
                {model:Category , attributes:['name']},
                {model: Installment , required:false}
            ],
            where:{
                [Op.or]:[
                    {
                        [Op.and]:[
                            where(fn('MONTH' , col('Transaction.date')) , month),
                            where(fn('YEAR' , col('Transaction.date')), year)
                        ]
                    },
                    {
                        '$Installments.dueDate$':{
                            [Op.and]:[
                                where(fn('MONTH', col('Installments.dueDate')), month),
                                where(fn('YEAR', col('Installments.dueDate')), year)
                            ]
                        }
                    }
                ]
            },
            order:[['date' , 'ASC']]
         });
        
         return transactions;
}

module.exports = {
    formattedTransactionsService,
    getAllTransaction
}