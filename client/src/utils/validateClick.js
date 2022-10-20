export const validateClick = (value, setClickChoice) => {
  if (value === "perfil") {
    setClickChoice({
      isPerfil: true,
      isSocios: false,
      isGrupo: false,
      isCalendario: false,
      isRequest: false,
    });
  }
  if (value === "socios") {
    setClickChoice({
      isPerfil: false,
      isSocios: true,
      isGrupo: false,
      isCalendario: false,
      isRequest: false,
    });
  }
  if (value === "grupo") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isGrupo: true,
      isCalendario: false,
      isRequest: false,
    });
  }
  if (value === "calendario") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isGrupo: false,
      isCalendario: true,
    });
  }
  if (value === "perfil") {
    setClickChoice({
      isPerfil: true,
      isSocios: false,
      isPagos: false,
      isGrupos: false,
      isRequest: false,
    });
  }

  if (value === "pagos") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isPagos: true,
      isGrupos: false,
      isRequest: false,
    });
  }

  if (value === "grupos") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isPagos: false,
      isGrupos: true,
      isRequest: false,
    });
  }

  if (value === "calendario") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isPagos: false,
      isGrupos: false,
      isCalendario: true,
      isRequest: false,
    });
  }

  if (value === "request") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isPagos: false,
      isGrupos: false,
      isCalendario: false,
      isRequest: true,
    });
  }
};
