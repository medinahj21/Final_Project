import React from "react";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebase.config";
const googleProvider = new GoogleAuthProvider();

function LoginGoogle() {
  return (
    <button onClick={() => signInWithRedirect(auth, googleProvider)}>
      Acceder con google
    </button>
  );
}

export default LoginGoogle;
