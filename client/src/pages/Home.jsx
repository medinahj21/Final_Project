import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Nav from "../components/Nav/Nav";

import { getUserFirestore } from "../redux/actions/auth";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config.js";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(getUserFirestore(currentUser.uid));
      }
    });

    return () => unSuscribe();
  }, [dispatch]);

  return (
    <div>
      <Nav />
    </div>
  );
}

export default Home;
