const {Category , Installment , Transaction} = require('../models');
const { Op, where, fn, col} = require('sequelize');


const getAllTransaction = async (month, year) => {
  const transactions = await Transaction.findAll({
    where:{
      [Op.and]:[
        where(fn('MONTH' , col('date')) , month),
        where(fn('YEAR' , col('date')) , year)
      ]
    },
    include:[
      {model: Category , attributes:['name']},
      {model:Installment , required:false}
    ]
  });

  const installments = await Installment.findAll({
    where:{
      [Op.and]:[
        where(fn('MONTH' , col('dueDate')) , month),
        where(fn('YEAR' , col('dueDate')) , year),
      ]
    },
    include:[
      {model:Transaction , include:[{model:Category , attributes:['name']}]}
    ]
  });
  return {transactions , installments};
};

module.exports = {
    getAllTransaction,
}