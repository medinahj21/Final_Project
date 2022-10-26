import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import whatsappIcon from "../../images/boton-whatsapp.png";

//import Modal from "../UI/Modal";
import { FiMapPin, FiMail } from "react-icons/fi";
import { FaPhone } from "react-icons/fa";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import "./ContactForm.css";

const ContactForm = ({ setShowContactForm }) => {
  const notify = () =>
    toast.success(
      "Tu mensaje fue enviado con exito. Gracias por contactarnos!",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  const changeHandler = (e) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    notify();
    emailjs
      .sendForm(
        "service_etq8sc9",
        "template_v29tr0g",
        e.target,
        "HiM3xW9AUxaXgJdP3"
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="contact-form-global-container">
      <a className="go-back-button" href="/">
        Volver
      </a>
      <form onSubmit={sendEmail} className="contact-form">
        <ToastContainer />
        <div className="form-contact-main-container">
          <h2 className="title-contact-form">Contacto</h2>
          <div className="contactForm-leftData-container">
            <span>
              <FiMail />
              {"  "}
              info@wolves.com
            </span>
            <span>
              <FiMapPin />
              {"  "}
              Av. 16 de julio - Unidad deportiva Belén
            </span>
            <span>
              <FaPhone />
              {"  "}
              (604) 3228764
            </span>
            <div className="social-networks">
              <span>
                <BsFacebook />
              </span>
              <span>
                <AiFillTwitterCircle />
              </span>
              <span>
                <BsInstagram />
              </span>
            </div>
            <div className="whatsapp-container">
              <a href="https://api.whatsapp.com/send?phone=573192452766&text=Wolves%20Volleyball%20Club%20¡Bienvenido!"
              target="_blank" rel="noreferrer noopener">
                <img
                  src={whatsappIcon}
                  alt="whatsapp-icon"
                  className="whatsapp-icon"
                />
              </a>
            </div>
          </div>
          <div className="contactForm-rightData-container">
            <input
              type="text"
              value={userInput.name}
              name="name"
              id="name"
              placeholder="Nombre"
              onChange={changeHandler}
            />
            <br />
            <input
              type="text"
              value={userInput.email}
              name="email"
              id="email"
              placeholder="Tu email"
              onChange={changeHandler}
            />
            <br />
            <textarea
              value={userInput.message}
              name="message"
              id="message"
              placeholder="Mensaje"
              maxLength={255}
              rows={10}
              cols={60}
              wrap="hard"
              onChange={changeHandler}
            />
            <br />
            <button>Enviar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
