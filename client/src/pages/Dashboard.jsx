import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase.config";

import { clickChoiceHandler, getAllInfoUsers } from "../redux/actions/auth";

import InfoCard from "../components/UI/InfoCard";
import "./Dashboard.css";
import DashNabvar from "./DashNabvar";
import Navphone from "../components/Nav/Navphone";
import DebtCard from "../components/Dashboard/DebtCard";
import UserDB from "../components/Dashboard/UserDB";
import UpdateCredentials from "../components/Dashboard/UpdateCredentials";
import Groups from "../components/Groups/Groups";
import Perfil from "../components/Dashboard/perfil/Perfil";

function Admin() {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1450) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 1450) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const dispatch = useDispatch();

  const { allUserFirestore, userInfoFirestore, clickChoicePersist } =
    useSelector((state) => state.authReducer);

  const [clickChoice, setClickChoice] = useState({ ...clickChoicePersist });

  useEffect(() => {
    dispatch(clickChoiceHandler(clickChoice));
  }, [clickChoice, dispatch]);

  useEffect(() => {
    if (userInfoFirestore.isAdmin) {
      getDocs(collection(firestore, "usuarios")).then((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => doc.data());
        dispatch(getAllInfoUsers(docs));
      });
    }
  }, [dispatch, userInfoFirestore]);

  return (
    <>
      {isDesktop ? (
        <DashNabvar setClickChoice={setClickChoice} clickChoice={clickChoice} />
      ) : (
        <Navphone setClickChoice={setClickChoice} isDashboard={true} />
      )}

      <div className="dashboard__content">
        {clickChoice.isPerfil && (
          <>
            {/* <InfoCard userInfoFirestore={userInfoFirestore} perfil={true} /> */}
            <Perfil userInfoFirestore={userInfoFirestore} />
            <UpdateCredentials />
            {/* Mapear deudas por mes --> */}
            <DebtCard month={"octubre"} />
            <DebtCard month={"noviembre"} />
          </>
        )}
        {clickChoice.isRequest && (
          <>
            <UserDB />
          </>
        )}
        {clickChoice.isGrupos && (
          <>
            <Groups />
          </>
        )}
        {clickChoice.isGrupo && (
          <>
            <Groups />
          </>
        )}
        {clickChoice.isSocios && (
          <div className="cards__container">
            {allUserFirestore ? (
              allUserFirestore.map((user) => {
                return !user.isAdmin ? (
                  <InfoCard
                    className={"infoAdmin"}
                    key={userInfoFirestore.document + Math.random()}
                    userInfoFirestore={user}
                  />
                ) : (
                  <></>
                );
              })
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Admin;
