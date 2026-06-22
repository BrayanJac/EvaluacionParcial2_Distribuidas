/**
 * Servicio de Estado de Cuentas
 * Responsabilidad Única (SRP): Gestionar el estado de cuentas y transacciones
 * - Almacena y recupera usuarios
 * - Actualiza saldos
 * - Mantiene historial de transacciones
 */

class AccountStateService {
  constructor() {
    // SIMULACIÓN DE UNA BASE DE DATOS EN MEMORIA (Estado global/local)
    this.usersDb = [
      { id: 'usr_001', email: 'estudiante.alpha@espe.edu.ec', accountAlpha: 'ACC-12345', balance: 1500.00 },
      { id: 'usr_002', email: 'docente.beta@espe.edu.ec', accountAlpha: 'ACC-67890', balance: 350.50 }
    ];
    this.transactionsHistory = [];
  }

  getAccountByAlpha(accountAlpha) {
    return this.usersDb.find(u => u.accountAlpha === accountAlpha);
  }

  updateBalances(sender, receiver, amount) {
    sender.balance -= amount;
    receiver.balance += amount;
    return { sender, receiver };
  }

  recordTransaction(fromAccountId, toAccountId, amount) {
    const newTransaction = {
      transactionId: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      from: fromAccountId,
      to: toAccountId,
      amount: amount,
      status: 'COMPLETED',
      timestamp: new Date().toISOString()
    };
    this.transactionsHistory.push(newTransaction);
    return newTransaction;
  }

  getAccountBalance(accountId) {
    const account = this.getAccountByAlpha(accountId);
    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }
    return {
      accountId: account.accountAlpha,
      email: account.email,
      balance: account.balance
    };
  }

  getUsersDb() {
    return this.usersDb;
  }

  getTransactionsHistory() {
    return this.transactionsHistory;
  }
}

module.exports = AccountStateService;
