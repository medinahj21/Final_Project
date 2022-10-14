import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";

import { auth } from "../../firebase/firebase.config";
const googleProvider = new GoogleAuthProvider();

function LoginGoogle() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { email, nickName } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.uid) {
        const email = currentUser.email;
        const nickname = currentUser.displayName;
        dispatch(login(email, nickname));
        setLoading(true);
      } else {
        setLoading(false);
      }
    });

    return () => unSuscribe();
  }, [dispatch]);

  return (
    <>
      <button onClick={() => signInWithRedirect(auth, googleProvider)}>
        Acceder con google
      </button>
      {!loading ? (
        <h3>Cargando...</h3>
      ) : (
        <h2>Bienvenid@: {nickName ? nickName : email}</h2>
      )}
    </>
  );
}

export default LoginGoogle;
