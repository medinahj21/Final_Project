import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase.config";

import { getPlayerDetail } from "../redux/actions/player";
import { setInitialCart } from "../redux/actions/shoppingCart";
import { clickChoiceHandler, getAllInfoUsers } from "../redux/actions/auth";

import InfoCard from "../components/Dashboard/Admins/InfoCard";
import DebtCard from "../components/Dashboard/DebtCard";
import Inscriptions from "../components/Dashboard/Inscriptions";
import Groups from "../components/Groups/Groups";
import Perfil from "../components/Dashboard/perfil/Perfil";
import NavbarDash from "../components/Dashboard/navbar/NavbarDash";
import Calendario from "../components/Calendar/Calendario";

import "./Dashboard.css";

function Admin() {
  const dispatch = useDispatch();

  const { allUserFirestore, userInfoFirestore, clickChoicePersist } =
    useSelector((state) => state.authReducer);

  const { playerDetail } = useSelector((state) => state.playerReducer);

  useEffect(() => {
    dispatch(
      setInitialCart(
        playerDetail?.shoppingCart ? playerDetail.shoppingCart : []
      )
    );
  }, [dispatch, playerDetail]);

  useEffect(() => {
    //llamar todos los players si es admin
    if (userInfoFirestore.isAdmin) {
      getDocs(collection(firestore, "usuarios")).then((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => doc.data());
        dispatch(getAllInfoUsers(docs));
      });
    }
    dispatch(getPlayerDetail(userInfoFirestore.uid));
  }, [dispatch, userInfoFirestore]);

  const [clickChoice, setClickChoice] = useState({ ...clickChoicePersist });

  useEffect(() => {
    dispatch(clickChoiceHandler(clickChoice));
  }, [clickChoice, dispatch]);

  const sortUsers =
    allUserFirestore &&
    allUserFirestore?.sort((a, b) => {
      return Number(b.isAdmin) - Number(a.isAdmin);
    });

  return (
    <>
      <NavbarDash setClickChoice={setClickChoice} />

      <div className="dashboard__content">
        {clickChoice.isPerfil && (
          <>
            <Perfil userInfoFirestore={userInfoFirestore} />
            {!userInfoFirestore.isAdmin ? (
              <>
                {/* Mapear deudas por mes --> */}
                <div className="debts__cards">
                  <DebtCard month={"octubre"} />
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
        {clickChoice.isCalendario && <Calendario />}
        {clickChoice.isGrupo && (
          <>
            <Groups />
          </>
        )}
        {clickChoice.isSocios && (
          <div className="cards__container">
            {allUserFirestore ? (
              sortUsers.map((user, i) => {
                return (
                  <InfoCard
                    className={"infoAdmin"}
                    key={i}
                    userInfoFirestore={user}
                  />
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
