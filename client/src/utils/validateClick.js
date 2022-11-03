export const validateClick = (value, setClickChoice) => {
  if (value === "perfil") {
    setClickChoice({
      isSocios: false,
      isPagos: false,
      isGrupos: false,
      isGrupo: false,
      isPagosHistory: false,
      isRequest: false,
      isPlayer: false,
      isPerfil: true,
    });
  }

  if (value === "socios") {
    setClickChoice({
      isPerfil: false,
      isPagosHistory: false,
      isPagos: false,
      isGrupos: false,
      isGrupo: false,
      isRequest: false,
      isPlayer: false,
      isSocios: true,
    });
  }

  if (value === "grupo") {
    setClickChoice({
      isPerfil: false,
      isPagosHistory: false,
      isSocios: false,
      isPagos: false,
      isGrupos: false,
      isRequest: false,
      isPlayer: false,
      isGrupo: true,
    });
  }

  if (value === "pagos") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isGrupo: false,
      isGrupos: false,
      isPagosHistory: false,
      isPlayer: false,
      isRequest: false,
      isPagos: true,
    });
  }

  if (value === "grupos") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isPagos: false,
      isPagosHistory: false,
      isGrupo: false,
      isPlayer: false,
      isRequest: false,
      isGrupos: true,
    });
  }

  if (value === "request") {
    setClickChoice({
      isPerfil: false,
      isPagosHistory: false,
      isSocios: false,
      isPagos: false,
      isGrupos: false,
      isGrupo: false,
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
      isRequest: false,
      isPagosHistory: false,
      isPlayer: true,
    });
  }
  if (value === "pagosHistory") {
    setClickChoice({
      isPerfil: false,
      isSocios: false,
      isPagos: false,
      isGrupos: false,
      isGrupo: false,
      isRequest: false,
      isPlayer: false,
      isPagosHistory: true,
    });
  }
};
