function applyAssociations(db) {
  const { User, Category, Transaction, Installment } = db;

  // User ↔ Transaction
  User.hasMany(Transaction, { foreignKey: 'userId' });
  Transaction.belongsTo(User, { foreignKey: 'userId' });

  // Category ↔ Transaction
  Category.hasMany(Transaction, { foreignKey: 'categoryId' });
  Transaction.belongsTo(Category, { foreignKey: 'categoryId' });

  // Transaction ↔ Installment
  Transaction.hasMany(Installment, { foreignKey: 'transactionId' });
  Installment.belongsTo(Transaction, { foreignKey: 'transactionId' });
}

module.exports = applyAssociations;
