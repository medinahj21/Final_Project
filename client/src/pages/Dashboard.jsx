import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase.config";

import { clickChoiceHandler, getAllInfoUsers } from "../redux/actions/auth";

import InfoCard from "../components/UI/InfoCard";
import Navphone from "../components/Nav/Navphone";
import DebtCard from "../components/Dashboard/DebtCard";
import Inscriptions from "../components/Dashboard/Inscriptions";
import UpdateCredentials from "../components/Dashboard/UpdateCredentials";
import Groups from "../components/Groups/Groups";
import Perfil from "../components/Dashboard/perfil/Perfil";
import NavbarDash from "../components/Dashboard/navbar/NavbarDash";

import "./Dashboard.css";
import Calendario from "./Calendario/Calendario";

function Admin() {
  const dispatch = useDispatch();
  const [isDesktop, setDesktop] = useState(false);

  const { allUserFirestore, userInfoFirestore, clickChoicePersist } =
    useSelector((state) => state.authReducer);

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

  useEffect(() => {
    if (userInfoFirestore.isAdmin) {
      getDocs(collection(firestore, "usuarios")).then((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => doc.data());
        dispatch(getAllInfoUsers(docs));
      });
    }
  }, [dispatch, userInfoFirestore]);

  const [clickChoice, setClickChoice] = useState({ ...clickChoicePersist });

  useEffect(() => {
    dispatch(clickChoiceHandler(clickChoice));
  }, [clickChoice, dispatch]);

  return (
    <>
      {isDesktop ? (
        // <DashNabvar setClickChoice={setClickChoice} clickChoice={clickChoice} />
        <NavbarDash setClickChoice={setClickChoice} />
      ) : (
        <Navphone setClickChoice={setClickChoice} isDashboard={true} />
      )}

      <div className="dashboard__content">
        {clickChoice.isPerfil && (
          <>
            <Perfil userInfoFirestore={userInfoFirestore} />
            {!userInfoFirestore.isAdmin ? (
              <>
                {/* Mapear deudas por mes --> */}
                <div className="debts__cards">
                  <DebtCard month={"octubre"} />
                  <DebtCard month={"noviembre"} />
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        )}
        {clickChoice.isPagos && (
          <>
            {!userInfoFirestore.isAdmin ? (
              <>
                {/* Mapear deudas por mes --> */}
                <div>Detalles de pagos player</div>
              </>
            ) : (
              <div>Detalles de pagos admin</div>
            )}
          </>
        )}
        {clickChoice.isRequest && (
          <>
            <Inscriptions />
          </>
        )}
        {clickChoice.isCalendario && (
          <Calendario />
        )}
        {clickChoice.isGrupo && (
          <>
            <Groups />
          </>
        )}
        {clickChoice.isSocios && (
          <div className="cards__container">
            {allUserFirestore ? (
              allUserFirestore.map((user,i) => {
                return !user.isAdmin ? (
                  <InfoCard
                    className={"infoAdmin"}
                    key={i}
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
