export const validateContact = (userInput) => {
  let error = "";
  if (userInput.name.trim().length < 1) return (error = "Ingrese un nombre");
  if (
    !userInput.email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return (error = "Ingrese un email válido");
  if (userInput.message.trim().length < 1) return (error = "Ingrese un asunto");

  return error;
};
