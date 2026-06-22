# Fintech SecurePay - Evaluación Parcial Práctica: Arquitecturas Distribuidas

### Evidencia de Postman

#### 1. Generación de Token JWT
**[INSERTAR CAPTURA DE PANTALLA: Postman - Generación de Token]**
- Endpoint: POST `/v1/auth/login` (simulado)
- Response: Token JWT firmado con RS256
- Payload decodificado mostrando claims (sub, name, exp)

#### 2. Acceso con Token Válido
**[INSERTAR CAPTURA DE PANTALLA: Postman - Transferencia con Token Válido]**
- Endpoint: POST `/v1/transfer-beta/execute`
- Header: `Authorization: Bearer <token_valido>`
- Response: 200 OK - Transferencia ejecutada exitosamente

#### 3. Acceso con Token Expirado
**[INSERTAR CAPTURA DE PANTALLA: Postman - Token Expirado]**
- Endpoint: POST `/v1/transfer-beta/execute`
- Header: `Authorization: Bearer <token_expirado>`
- Response: 401 Unauthorized - "Token expirado"
- **Nota**: Este error NO genera alerta en Sentry (error lógico)

#### 4. Acceso con Token Inválido
**[INSERTAR CAPTURA DE PANTALLA: Postman - Token Inválido]**
- Endpoint: POST `/v1/transfer-beta/execute`
- Header: `Authorization: Bearer <token_invalido>`
- Response: 403 Forbidden - "Token inválido"
- **Nota**: Este error NO genera alerta en Sentry (error lógico)

---
