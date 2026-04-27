export function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

export function validarPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(String(password));
}

export function required(value, field) {
  if (value === undefined || value === null || String(value).trim() === '') {
    throw new Error(`El campo ${field} es obligatorio`);
  }
}
