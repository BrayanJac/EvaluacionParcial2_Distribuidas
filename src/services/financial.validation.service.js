/**
 * Servicio de Validación Financiera
 * Responsabilidad Única (SRP): Validar reglas de negocio financieras
 * - Verifica existencia de cuentas
 * - Valida montos positivos
 * - Verifica suficiencia de saldo
 */

class FinancialValidationService {
  constructor(accountStateService) {
    this.accountStateService = accountStateService;
  }

  validateTransfer(fromAccountId, toAccountId, amount) {
    const sender = this.accountStateService.getAccountByAlpha(fromAccountId);
    if (!sender) {
      throw new Error(`Error de validación: La cuenta origen '${fromAccountId}' no existe en la base de datos.`);
    }

    const receiver = this.accountStateService.getAccountByAlpha(toAccountId);
    if (!receiver) {
      throw new Error(`Error de validación: La cuenta destino '${toAccountId}' no existe en la base de datos.`);
    }

    if (amount <= 0) {
      throw new Error('Error de validación: El monto a transferir debe ser mayor a cero.');
    }

    if (sender.balance < amount) {
      throw new Error(`Saldo insuficiente: La cuenta '${fromAccountId}' tiene $${sender.balance}, requiere $${amount}.`);
    }

    return { sender, receiver };
  }

  validateAccountExists(accountId) {
    const account = this.accountStateService.getAccountByAlpha(accountId);
    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }
    return account;
  }
}

module.exports = FinancialValidationService;
