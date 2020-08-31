/*Jawad Samad
  Novi Hogeschool
  Blockchain "BLC"
*/

const Transaction = require('../wallet/transaction');

class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  //Will add a incoming transaction object to the transaction array. After controlling if there aren't the same transactions with the same ID
  updateOrAddTransaction(transaction) {
    let transactionWithId = this.transactions.find(t => t.id === transaction.id);

    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }

  // Returns a transaction based on the given public key address, if it exist in the pool 
  existingTransaction(address) {
    return this.transactions.find(t => t.input.address === address);
  }

  // Validating transactions on multiple conditions like, balance, signature and amount.
  validTransactions() {
    return this.transactions.filter(transaction => {
      const outputTotal = transaction.outputs.reduce((total, output) => {
        return total + output.amount;
      }, 0);

      if (transaction.input.amount !== outputTotal) {
        console.log(`Invalid transaction from ${transaction.input.address}.`);
        return;
      }

      if (!Transaction.verifyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.input.address}.`);
        return;
      }

      return transaction;
    });
  }

  //Clearing the pool from all the transactions once mined
  clear() {
    this.transactions = [];
  }
}

module.exports = TransactionPool;