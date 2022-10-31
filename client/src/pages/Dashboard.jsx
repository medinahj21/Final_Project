import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase.config";

import { clickChoiceHandler, getAllInfoUsers } from "../redux/actions/auth";

<<<<<<< HEAD
import InfoCard from "../components/UI/InfoCard";
=======
>>>>>>> 33b76f07feb633e6a8ea3716a9827274de1ae5bd
import DebtCard from "../components/Dashboard/DebtCard";
import Inscriptions from "../components/Dashboard/Inscriptions";
import Groups from "../components/Groups/Groups";
import Perfil from "../components/Dashboard/perfil/Perfil";
import NavbarDash from "../components/Dashboard/navbar/NavbarDash";
<<<<<<< HEAD

import "./Dashboard.css";
import Calendario from "./Calendario/Calendario";
import { getPlayerDetail } from "../redux/actions/player";
import { setInitialCart } from "../redux/actions/shoppingCart";
=======
import Calendar from "../components/Calendar/Calendar";

import "./Dashboard.css";
import InfoTable from "../components/Dashboard/Admins/InfoTable";
import PlayerPayments from "../components/Dashboard/Payments/PlayerPayments";
>>>>>>> 33b76f07feb633e6a8ea3716a9827274de1ae5bd

function Admin() {
  const dispatch = useDispatch();
  const [isDesktop, setDesktop] = useState(false);

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
      {/* {isDesktop ? ( */}
      <NavbarDash setClickChoice={setClickChoice} />
      {/* ) : (
        <Navphone setClickChoice={setClickChoice} isDashboard={true} />
      )} */}

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
