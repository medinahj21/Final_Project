import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import Nav from "../components/Nav/Nav";

import { getGroups } from "../redux/actions/actionsGroup";
import { getUserFirestore } from "../redux/actions/auth";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config.js";

import Navphone from "../components/Nav/Navphone";
import Login from "../components/Register/Login";
import Register from "../components/Register/Register";
import FormUser from "../components/Register/FormUser";

import "./Home.css";
import GroupsInfo from "../components/Home/GroupsInfo";

function Home() {
  const dispatch = useDispatch();

  const [isDesktop, setDesktop] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAlta, setShowAlta] = useState(false);

  const groups = useSelector((state) => state.groupReducer.groups);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

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
    const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(getUserFirestore(currentUser.uid));
      }
    });
    return () => unSuscribe();
  }, [dispatch]);
  console.log(setShowAlta);
  return (
    <>
      {!isDesktop ? (
        <Navphone
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          setShowAlta={setShowAlta}
        />
      ) : (
        <Nav
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          setShowAlta={setShowAlta}
        />
      )}
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      {showRegister ? <Register setShowRegister={setShowRegister} /> : <></>}
      {showAlta ? <FormUser setShowAlta={setShowAlta} /> : <></>}
      <div className="home__container">
        <h1>Club Wolves - Voleyball</h1>
      </div>
      <div className="home__container-carrousel"></div>
      <div className="home__gruops">
        {groups?.map((group, i) => {
          const alter = i % 2 === 0 ? "alt" : "";
          return (
            <GroupsInfo
              key={i}
              position={alter}
              name={group.name}
              schedule={group.schedule}
              price={group.inscription_cost}
              id={group.id}
              img={group.image}
              genre={group.genre}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
