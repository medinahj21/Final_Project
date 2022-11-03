import { sendEmailVerification } from "firebase/auth";
import Swal from "sweetalert2";

export const sendVerificationEmail = (currentUser) =>
  sendEmailVerification(currentUser)
    .then(() => {
      // Email verification sent!
      // ...
      Swal.fire({
        title: "Recuerda verificar tu email, revisa tu casilla de spam!",
        confirmButtonText: "Confirmar",
        confirmButtonColor: "#01002E",
        target: document.getElementById("register"),
      });
    })
    .catch((err) => {
      console.log(err);
    });


    