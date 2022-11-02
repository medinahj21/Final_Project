export const validateNewPlayer = (value) => {
  let error = "";

  if (value.debtValue.trim().length < 1 ) {
    return (error = "Debe ingresar un monto de cuota mensual válido ");
  }
  if (
    value.paymentDate.trim().length < 1 ||
    parseInt(value.paymentDate) < 1 ||
    parseInt(value.paymentDate) > 28
  ) {
    return (error = "Debe ingresar un dia del mes válido (1 al 28)");
  }
  if (value.shirtNumber.trim().length < 1) {
    return (error = "Debe ingresar un número de camiseta");
  }
  return error;
};
