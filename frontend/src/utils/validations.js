export function validateTask(raw) {
  const text = raw.trim();
  if (!text) return "La tarea no puede estar vacía ni contener solo espacios.";
  if (text.length < 3) return "La tarea debe tener al menos 3 caracteres.";
  const hasLetter = /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/.test(text);
  if (!hasLetter) return "La tarea debe contener al menos una letra.";
  const validChars = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\.,!¡?¿\-_:;'"()]+$/.test(text);
  if (!validChars) return "La tarea contiene caracteres no permitidos.";
  if (text.length > 120) return "La tarea no puede tener más de 120 caracteres.";
  return "";
}