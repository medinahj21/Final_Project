export const validateClick = (value, setClickChoice) => {
  if (value === "perfil") {
    setClickChoice({
      isSocios: false,
      isPagos: false,
      isGrupos: false,
      isGrupo: false,
      isCalendario: false,
      isRequest: false,
      isPlayer: false,
      isPerfil: true,
    });
  }

  if (value === "socios") {
    setClickChoice({
      isPerfil: false,
      isPagos: false,
      isGrupos: false,
      isGrupo: false,
      isCalendario: false,
      isRequest: false,
      isPlayer: false,
      isSocios: true,
    });
  }

  if (value === "grupo") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isPagos: false,
      isGrupos: false,
      isCalendario: false,
      isRequest: false,
      isPlayer: false,
      isGrupo: true,
    });
  }

  if (value === "calendario") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isPagos: false,
      isGrupos: false,
      isGrupo: false,
      isRequest: false,
      isPlayer: false,
      isCalendario: true,
    });
  }

  if (value === "pagos") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isGrupo: false,
      isGrupos: false,
      isPlayer: false,
      isCalendario: false,
      isRequest: false,
      isPagos: true,
    });
  }

  if (value === "grupos") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isPagos: false,
      isGrupo: false,
      isPlayer: false,
      isRequest: false,
      isCalendario: false,
      isGrupos: true,
    });
  }

  if (value === "request") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isPagos: false,
      isGrupos: false,
      isGrupo: false,
      isCalendario: false,
      isPlayer: false,
      isRequest: true,
    });
  }

  if (value === "player") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isPagos: false,
      isGrupos: false,
      isGrupo: false,
      isCalendario: false,
      isRequest: false,
      isPlayer: true,
    });
  }
};
