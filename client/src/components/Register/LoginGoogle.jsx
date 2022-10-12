import React from "react";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();

function LoginGoogle({ auth }) {
  return (
    <button onClick={() => signInWithRedirect(auth, googleProvider)}>
      Acceder con google
    </button>
  );
}

export default LoginGoogle;
