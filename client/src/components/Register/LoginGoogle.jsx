import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";

import { auth } from "../../firebase/firebase.config";

import "./LoginGoogle.css";

const googleProvider = new GoogleAuthProvider();

function LoginGoogle() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.uid) {
        const email = currentUser.email;
        const nickname = currentUser.displayName;
        dispatch(login(email, nickname));
      }
    });

    return () => unSuscribe();
  }, [dispatch]);

  return (
    <>
      <button
        onClick={() => signInWithRedirect(auth, googleProvider)}
        type="button"
        class="login-with-google-btn"
      >
        Acceder con Google
      </button>
    </>
  );
}

export default LoginGoogle;
