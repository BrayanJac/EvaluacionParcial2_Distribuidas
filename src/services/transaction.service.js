/**
 * Servicio de Transacciones Refactorizado
 * Aplicación de Principio de Responsabilidad Única (SRP) e Inversión de Dependencias (DIP)
 * - Orquesta la ejecución de transferencias inyectando servicios especializados
 * - No implementa directamente validación, estado o notificaciones
 */

class TransactionService {
  constructor(financialValidationService, accountStateService, notificationService) {
    this.financialValidationService = financialValidationService;
    this.accountStateService = accountStateService;
    this.notificationService = notificationService;
  }

  executeTransfer(fromAccountId, toAccountId, amount) {
    // Paso 1: Validación financiera (inyectada)
    const { sender, receiver } = this.financialValidationService.validateTransfer(
      fromAccountId,
      toAccountId,
      amount
    );

    // Paso 2: Actualización de estado (inyectada)
    const updatedAccounts = this.accountStateService.updateBalances(sender, receiver, amount);

    // Paso 3: Registro de transacción (inyectada)
    const transaction = this.accountStateService.recordTransaction(fromAccountId, toAccountId, amount);

    // Paso 4: Notificaciones (inyectadas)
    this.notificationService.sendDebitNotification(
      updatedAccounts.sender,
      fromAccountId,
      amount,
      updatedAccounts.sender.balance
    );
    this.notificationService.sendCreditNotification(
      updatedAccounts.receiver,
      fromAccountId,
      amount,
      updatedAccounts.receiver.balance
    );

    return {
      success: true,
      message: 'Transferencia ejecutada con éxito',
      transaction: transaction,
      balanceRestante: updatedAccounts.sender.balance
    };
  }

  getAccountBalance(accountId) {
    return this.accountStateService.getAccountBalance(accountId);
  }
}

module.exports = TransactionService;
