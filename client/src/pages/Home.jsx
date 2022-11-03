import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getGroups } from "../redux/actions/actionsGroup";

import Nav from "../components/Nav/Nav";
import Navphone from "../components/Nav/Navphone";
import FormUser from "../components/Register/FormUser";
import GroupsInfo from "../components/Home/GroupsInfo";
import LoginRegister from "../components/Register/LoginRegister.jsx/LoginRegister";
import Carousel from "../components/Home/Carousel";
import LoginRegisteMob from "../components/Register/LoginRegisterMobile/LoginRegisteMob";
import ContactForm from "../components/ContactForm/ContactForm";
import Calendar from "../components/Calendar/Calendar";
import About from "../components/AboutUs/About";

import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();

  const [isDesktop, setDesktop] = useState(false);
  const [isEventForm, setIsEventForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAlta, setShowAlta] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    const listenToScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (winScroll < 200) isVisible && setIsVisible(false);
      if (winScroll > 200) !isVisible && setIsVisible(true);
    };

    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, [isVisible]);

  return (
    <main id="home">
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
      {isVisible && (
        <a href="#home">
          <span className="back-up"></span>
        </a>
      )}
      <section className="home__carrousel">
        <Carousel />
      </section>
      <section className="home__gruops" id="oferta">
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
      </section>
      <section className="home_calendar" id="calendar">
        <Calendar />
      </section>
      <section className="home_about" id="about">
        <About />
      </section>
      <section className="home_footer" id="contact">
        <ContactForm />
      </section>
    </main>
  );
}

export default Home;
