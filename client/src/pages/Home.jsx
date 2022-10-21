import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import Nav from "../components/Nav/Nav";
// import FOTONIÑOS from "../images/niños.jpg";
// import FOTOJOVENES from "../images/jovenes.jpg";
// import FOTOADULTOS from "../images/adultos.jpg";

import { getUserFirestore } from "../redux/actions/auth";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config.js";

import "./Home.css";
import Navphone from "../components/Nav/Navphone";
import Login from "../components/Register/Login";
import Register from "../components/Register/Register";
import FormUser from "../components/Register/FormUser";

function Home() {
  const [isDesktop, setDesktop] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAlta, setShowAlta] = useState(false);

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

  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(getUserFirestore(currentUser.uid));
      }
    });
    return () => unSuscribe();
  }, [dispatch]);

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
      {/* <div className="home__gruops">
        <div className="home__gruop">
          <h3>Chicos</h3>
          <h5>6 a 12 años</h5>
          <div className="home__group-content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis beatae tempora aliquam corrupti voluptates nihil
              aliquid. Molestiae quia obcaecati vitae maiores porro, dolorem
              placeat, ex mollitia veniam ullam amet dolore. Pariatur, earum
              minus cupiditate tempora magni soluta saepe. Ex voluptatem
              expedita pariatur iste cupiditate quaerat, recusandae laborum,
              veniam in quidem corporis impedit odit quasi excepturi numquam
              omnis, ipsam explicabo fugiat.
            </p>
            <img src={FOTONIÑOS} alt="niños en el club" />
          </div>
        </div>
        <div className="home__gruop">
          <h3>Jovenes</h3>
          <h5>13 a 17 años</h5>
          <div className="home__group-content">
            <img src={FOTOJOVENES} alt="jovenes del club" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, odit molestias! Quod, dignissimos pariatur totam ea
              inventore neque consequuntur odit saepe sint temporibus, natus
              eligendi aliquid autem possimus non veniam. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Temporibus, odit molestias!
              Quod, dignissimos pariatur totam ea inventore neque consequuntur
              odit saepe sint temporibus, natus eligendi aliquid autem possimus
              non veniam.
            </p>
          </div>
        </div>
        <div className="home__gruop">
          <h3>Adultos</h3>
          <h5>+ 18 años</h5>
          <div className="home__group-content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, odit molestias! Quod, dignissimos pariatur totam ea
              inventore neque consequuntur odit saepe sint temporibus, natus
              eligendi aliquid autem possimus non veniam. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Temporibus, odit molestias!
              Quod, dignissimos pariatur totam ea inventore neque consequuntur
              odit saepe sint temporibus, natus eligendi aliquid autem possimus
              non veniam.
            </p>
            <img src={FOTOADULTOS} alt="adultos del club" />
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Home;
