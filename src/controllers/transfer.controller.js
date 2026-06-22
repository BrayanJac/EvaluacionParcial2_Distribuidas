const TransactionService = require('../services/transaction.service');
const AccountStateService = require('../services/account.state.service');
const FinancialValidationService = require('../services/financial.validation.service');
const NotificationService = require('../services/notification.service');

// Inyección de dependencias (DIP)
const accountStateService = new AccountStateService();
const financialValidationService = new FinancialValidationService(accountStateService);
const notificationService = new NotificationService();
const transactionService = new TransactionService(
  financialValidationService,
  accountStateService,
  notificationService
);

/**
 * Endpoint para ejecutar una transferencia bancaria (Beta).
 * POST /v1/transfer-beta/execute
 * 
 * Espera un cuerpo JSON con: { fromAccountId, toAccountId, amount }
 */
function executeTransfer(req, res) {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    if (!fromAccountId || !toAccountId || amount === undefined) {
      return res.status(400).json({
        error: 'Petición incorrecta',
        message: 'Los campos fromAccountId, toAccountId y amount son requeridos en el cuerpo de la petición.'
      });
    }

    const result = transactionService.executeTransfer(fromAccountId, toAccountId, Number(amount));
    return res.status(200).json(result);
  } catch (error) {
    // Si la validación o deducción falla, se maneja como error bad request.
    return res.status(400).json({
      error: 'Error en la transacción',
      message: error.message
    });
  }
}

module.exports = {
  executeTransfer,
  transactionService
};
