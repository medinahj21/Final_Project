import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const ResetPassword = (email) => {
  console.log(email);
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Se envio un correo a tu email para cambiar la contraseña");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
    });
};
