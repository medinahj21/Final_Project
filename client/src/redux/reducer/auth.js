import {
  LOGIN_USER_FIREBASE,
  LOGOUT_USER_FIREBASE,
  PLAYER__FORM__FIREBASE,
  ALL_PLAYER__FORM__FIREBASE,
  CLICK__CHOICE,
} from "../actions/actions";

const initialState = {
  email: "",
  nickName: "",
  userInfoFirestore: "",
  allUserFirestore: "",
  clickChoicePersist: {
    isPerfil: true,
    isSocios: false,
    isPagos: false,
    isGrupo: false,
    isCalendario: false,
    isRequest: false,
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_FIREBASE:
      return {
        ...state,
        email: action.payload.email,
        nickName: action.payload.nickName ? action.payload.nickName : "",
      };

    case LOGOUT_USER_FIREBASE:
      return {
        ...initialState,
      };

    case PLAYER__FORM__FIREBASE:
      return {
        ...state,
        userInfoFirestore: action.payload,
      };

    case ALL_PLAYER__FORM__FIREBASE:
      return {
        ...state,
        allUserFirestore: action.payload,
      };

    case CLICK__CHOICE:
      return {
        ...state,
        clickChoicePersist: action.payload,
      };

    default:
      return state;
  }
}
