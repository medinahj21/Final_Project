import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase.config";

import { getPlayerDetail } from "../redux/actions/player";
import { setInitialCart } from "../redux/actions/shoppingCart";
import { clickChoiceHandler, getAllInfoUsers } from "../redux/actions/auth";

import DebtCard from "../components/Dashboard/DebtCard";
import Inscriptions from "../components/Dashboard/Inscriptions";
import Groups from "../components/Groups/Groups";
import Perfil from "../components/Dashboard/perfil/Perfil";
import NavbarDash from "../components/Dashboard/navbar/NavbarDash";
import Calendar from "../components/Calendar/Calendar";

import "./Dashboard.css";
import InfoTable from "../components/Dashboard/Admins/InfoTable";
import PlayerPayments from "../components/Dashboard/Payments/PlayerPayments";

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
    if(!userInfoFirestore.isAdmin) dispatch(getPlayerDetail(userInfoFirestore.uid));
  }, [dispatch, userInfoFirestore]);

  const [clickChoice, setClickChoice] = useState({ ...clickChoicePersist });

  useEffect(() => {
    dispatch(clickChoiceHandler(clickChoice));
  }, [clickChoice, dispatch]);

  const adminUser =
    allUserFirestore &&
    allUserFirestore.filter((user) => user.isAdmin === true);
  const regularUser =
    allUserFirestore &&
    allUserFirestore.filter((user) => user.isAdmin === false);

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
                <PlayerPayments />
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
        {clickChoice.isCalendario && <Calendar />}
        {clickChoice.isGrupo && (
          <>
            <Groups />
          </>
        )}
        {clickChoice.isSocios && (
          <div>
            <InfoTable users={adminUser} admin={true} />
            <InfoTable users={regularUser} admin={false} />
          </div>
        )}
      </div>
    </>
  );
}

export default Admin;
