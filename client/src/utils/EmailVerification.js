import { sendEmailVerification } from "firebase/auth";

export const sendVerificationEmail = (currentUser) =>
  sendEmailVerification(currentUser)
    .then(() => {
      // Email verification sent!
      // ...
      alert("email de verificacion enviado");
    })
    .catch((err) => {
      console.log(err);
    });
