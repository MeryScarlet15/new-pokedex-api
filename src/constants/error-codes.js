export const ERROR_CODES = {
  DEFAULT_ERROR: 'Hubo un problema en el servidor',
  USER_EXISTS: 'El usuario ya existe',
  INVALID_LOGIN: 'Usuario o contraseña incorrecto',
  EMPTY_VALUE: (fieldName) => `El campo ${fieldName} está vacío`,
  INVALID_EMAIL: 'Email inválido'
}