export const validateForm = (userInput) => {
  let error = "";
  if (userInput.name.trim().length < 1)
    return (error = "Debe ingresar su nombre completo");
  if (userInput.typeDoc.trim().length < 1)
    return (error = "Debe ingresar su tipo de documento");
  if (userInput.document.trim().length < 1)
    return (error = "Debe ingresar un número de documento");
  if (userInput.years.trim().length < 1)
    return (error = "Debe ingresar su edad");
  if (userInput.birthDate.trim().length < 1)
    return (error = "Debe ingresar su fecha de nacimiento");
  if (userInput.cell.trim().length < 1)
    return (error = "Debe ingresar su teléfono");
  if (userInput.emergencyName.trim().length < 1)
    return (error = "Debe ingresar un contacto de emergencia");
  if (userInput.emergencyRel.trim().length < 1)
    return (error =
      "Debe ingresar el parentesco con su contacto de emergencia");
  if (userInput.emergencyContact.trim().length < 1)
    return (error = "Debe ingresar el número de su contacto de emergencia");
  if (userInput.bloodType.trim().length < 1)
    return (error = "Debe ingresar su tipo de sangre");
  if (userInput.health.trim().length < 1)
    return (error = "Debe ingresar su seguro de salud");
  if (userInput.specialConditions.trim().length < 1)
    return (error =
      "Si no tiene ninguna condicion particular de salud, ingrese 0");
  return error;
};
