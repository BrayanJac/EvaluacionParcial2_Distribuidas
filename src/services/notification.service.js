/**
 * Servicio de Notificaciones
 * Responsabilidad Única (SRP): Enviar notificaciones por consola
 * - Simula envío de correos electrónicos
 * - Formatea mensajes de confirmación
 */

class NotificationService {
  sendDebitNotification(sender, fromAccountId, amount, newBalance) {
    console.log(`\n--- [EMAIL OUTBOX MONOLITH] Enviando correo de confirmación ---`);
    console.log(`Para: ${sender.email}`);
    console.log(`Asunto: Débito por Transferencia Realizada - Fintech SecurePay`);
    console.log(`Mensaje: Estimado usuario, se ha debitado de su cuenta ${fromAccountId} el valor de $${amount}.`);
    console.log(`Su nuevo saldo disponible es: $${newBalance}.`);
    console.log(`------------------------------------------------------------\n`);
  }

  sendCreditNotification(receiver, fromAccountId, amount, newBalance) {
    console.log(`\n--- [EMAIL OUTBOX MONOLITH] Enviando correo de recepción ---`);
    console.log(`Para: ${receiver.email}`);
    console.log(`Asunto: Crédito por Transferencia Recibida - Fintech SecurePay`);
    console.log(`Mensaje: Estimado usuario, ha recibido una transferencia de $${amount} de la cuenta ${fromAccountId}.`);
    console.log(`Su nuevo saldo disponible es: $${newBalance}.`);
    console.log(`------------------------------------------------------------\n`);
  }
}

module.exports = NotificationService;
