export const firebaseError = (error) => {
  let formatError = "Ups! Algo salió mal";
  if (error === "Firebase: Error (auth/invalid-email).") {
    return (formatError = "Ingrese un correo válido");
  }
  if (error === "Firebase: Error (auth/internal-error).") {
    return (formatError = "Ingrese una contraseña");
  }
  if (error === "Firebase: Error (auth/wrong-password).") {
    return (formatError = "Usuario o contraseña incorrecta");
  }
  if (error === "Firebase: Error (auth/user-not-found).") {
    return (formatError = "Usuario o contraseña incorrecta");
  }
  if (
    error ===
    "Firebase: Password should be at least 6 characters (auth/weak-password)."
  ) {
    return (formatError = "La contraseña debe ser de 6 o mas caracteres");
  }
  if (
    error ===
    "Firebase: Error (auth/email-already-in-use)."
  ) {
    return (formatError = "Correo ya registrado");
  }
  return formatError;
};
