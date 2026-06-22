const jwtService = require('../services/jwt.service');

function login(req, res) {
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      return res.status(400).json({
        error: 'Petición incorrecta',
        message: 'Los campos id y name son requeridos en el cuerpo de la petición.'
      });
    }

    // Generar token JWT con claims seguros
    const token = jwtService.signToken({ id, name });

    return res.status(200).json({
      success: true,
      message: 'Autenticación exitosa',
      token: token,
      expiresIn: '2 minutos'
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Error en la autenticación',
      message: error.message
    });
  }
}

module.exports = {
  login
};
