import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import Nav from "../components/Nav/Nav";

import { getGroups } from "../redux/actions/actionsGroup";

import Navphone from "../components/Nav/Navphone";
import FormUser from "../components/Register/FormUser";

import GroupsInfo from "../components/Home/GroupsInfo";
import LoginRegister from "../components/Register/LoginRegister.jsx/LoginRegister";
import Carousel from "../components/Home/Carousel";
import LoginRegisteMob from "../components/Register/LoginRegisterMobile/LoginRegisteMob";
import ContactForm from "../components/ContactForm/ContactForm";
import Calendar from "../components/Calendar/Calendar";

import "./Home.css";

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

  console.log(showLogin);
  
  return (
    <div id="home">
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
      {showAlta ? <FormUser setShowAlta={setShowAlta} /> : <></>}
      {!isDesktop ? (
        <>
          {showLogin && (
            <LoginRegisteMob
              setShowLogin={setShowLogin}
              showLogin={showLogin}
              setShowRegister={setShowRegister}
            />
          )}
          {showRegister && (
            <LoginRegisteMob
              setShowLogin={setShowLogin}
              showLogin={showLogin}
              setShowRegister={setShowRegister}
            />
          )}
        </>
      ) : (
        <>
          {showRegister && (
            <LoginRegister
              setShowLogin={setShowLogin}
              showLogin={showLogin}
              setShowRegister={setShowRegister}
            />
          )}
          {showLogin && (
            <LoginRegister
              setShowLogin={setShowLogin}
              showLogin={showLogin}
              setShowRegister={setShowRegister}
            />
          )}
        </>
      )}
      <a href="#home">
        <span className="back-up"></span>
      </a>
      <div className="home__carrousel">
        <Carousel />
      </div>
      <div className="home__gruops" id="oferta">
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
      <div className="home_calendar" id="calendar">
        <Calendar />
      </div>
      <div className="home_footer" id="contact">
        <ContactForm />
      </div>
    </div>
  );
}

export default Home;
