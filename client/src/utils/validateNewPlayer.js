export const validateNewPlayer = (value) => {
  let error = "";
  console.log(parseInt(value.paymentDate));
  if (value.debtValue.trim().length < 1) {
    return (error = "Debe ingresar un monto de cuota mensual");
  }
  if (
    value.paymentDate.trim().length < 1 ||
    parseInt(value.paymentDate) < 1 || parseInt(value.paymentDate) > 21 
  ) {
    return (error = "Debe ingresar un dia del mes válido (1 al 21)");
  }
  if (value.shirtNumber.trim().length < 1) {
    return (error = "Debe ingresar un número de camiseta");
  }
  return error;
};
