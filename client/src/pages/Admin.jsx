import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase.config";

import { getAllInfoUsers } from "../redux/actions/auth";

function Admin() {
  const dispatch = useDispatch();

  useEffect(() => {
    getDocs(collection(firestore, "usuarios")).then((querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => doc.data());
      dispatch(getAllInfoUsers(docs));
    });
  }, [dispatch]);

  const { allUserFirestore, userInfoFirestore } = useSelector(
    (state) => state.authReducer
  );

  return (
    <div>
      <Link to={"/"}>Home</Link>
      <h1>Bienvenido: {userInfoFirestore?.email}</h1>
      {allUserFirestore ? (
        allUserFirestore.map((user) => {
          return !user.isAdmin ? (
            <div key={userInfoFirestore.document + Math.random()}>
              <h2>Nomnbre: {user.name}</h2>
              <p>Edad: {user.years}</p>
              <p>Fecha de nacimiento: {user.birthDate}</p>
              <p>Tipo de sangre: {user.bloodType}</p>
              <p>Número de teléfono: {user.cell}</p>
              <p>Tipo de documento: {user.typeDoc}</p>
              <p>Documento: {user.document}</p>
              <p>Email: {user.email}</p>
              <h3>Contacto de emergencia: {user.emergencyName}</h3>
              <p>Número de teléfono: {user.emergencyContact}</p>
              <p>Parentesco: {user.emergencyRel}</p>
              <p>Seguro de salud: {user.health}</p>
            </div>
          ) : (
            <p>Cargando usuarios</p>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default Admin;
