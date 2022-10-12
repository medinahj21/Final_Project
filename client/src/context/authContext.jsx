import { createContext, useContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { auth, firestore } from "../firebase.config";

export const authContext = createContext();

//hook personalizado para no importar useContext en todos los componentes.
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSuscribe();
  }, []);

  const setUserFirestore = async (userInfo) => {
    const docRef = doc(firestore, `usuarios/${user.uid}`);
    await setDoc(docRef, { ...userInfo, uid: user.uid, isAdmin: false });
  };

  const getInfoUser = async () => {
    const docuRef = doc(firestore, `usuarios/${user.uid}`);
    const consult = await getDoc(docuRef);

    if (consult.exists()) {
      const infoDocu = consult.data();
      return infoDocu;
    } else {
      const notExist = <p>Not found</p>;
      return notExist;
    }
  };

  const getAllInfoUser = async () => {
    const querySnapshot = await getDocs(collection(firestore, "usuarios"));
    const docs = querySnapshot.docs.map(doc => doc.data())
    console.log(querySnapshot);
    return docs
  };

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        setUserFirestore,
        getInfoUser,
        getAllInfoUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
