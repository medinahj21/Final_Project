import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs/browser";

//import Modal from "../UI/Modal";
import { FiMapPin, FiMail } from "react-icons/fi";
import { FaPhone } from "react-icons/fa";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import "./ContactForm.css";

const ContactForm = ({ setShowContactForm }) => {

  
  
  const notify = () =>
    toast.success("Tu mensaje fue enviado con exito. Gracias por contactarnos!", {
      position: toast.POSITION.TOP_RIGHT,
    });

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

  const handleSubmit= (e)=> {
    e.preventDefault();
    notify();
  }

  return (
    <div className="contact-form-global-container">
      <a className="go-back-button" href="/">Volver</a>
      <form onSubmit={handleSubmit} className="contact-form">
      <ToastContainer />
        <div className="form-contact-main-container">
          <h2 className="title-contact-form">Contacto</h2>
          <div className="contactForm-leftData-container">
            <span>
              <FiMail />{"  "}
              info@wolves.com
            </span>
            <span>
              <FiMapPin />{"  "}
              Av. 16 de julio - Unidad deportiva Belén
            </span>
            <span>
              <FaPhone />{"  "}
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
            <input
              type="text"
              value={userInput.issue}
              name="issue"
              id="issue"
              placeholder="Asunto"
              onChange={changeHandler}
            />
            <br />
            <textarea
              value={userInput.message}
              name="message"
              id="message"
              placeholder="Mensaje"
              maxLength={255}
              rows= {10}
              cols= {60}
              wrap= "hard"
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
