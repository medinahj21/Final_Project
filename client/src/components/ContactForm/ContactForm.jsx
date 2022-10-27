import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import emailjs from "@emailjs/browser";

//import Modal from "../UI/Modal";
import { FiMapPin, FiMail } from "react-icons/fi";
import { FaPhone, FaWhatsappSquare } from "react-icons/fa";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";

import "./ContactForm.css";

const ContactForm = () => {
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
    emailjs.sendForm(
      "service_etq8sc9",
      "template_v29tr0g",
      e.target,
      "HiM3xW9AUxaXgJdP3"
    );
    setUserInput({ name: "", email: "", issue: "", message: "" })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h2 className="contact-form-title">Contacto</h2>
      <div className="contact-form-global-container">
        <div className="whatsapp-container">
          <a
            className="whatsapp-icon"
            href="https://api.whatsapp.com/send?phone=573192452766&text=Wolves%20Volleyball%20Club%20¡Bienvenido!"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaWhatsappSquare />
          </a>
        </div>
        <div className="contactForm-leftData-container">
          <div className="social-networks">
            <a
              href="https://www.facebook.com"
              target={"_blank"}
              rel="noreferrer"
              className="icon-socials"
            >
              <BsFacebook />
              <span className="color-bg-facebook">Facebook</span>
            </a>
            <a
              href="https://www.twitter.com"
              target={"_blank"}
              rel="noreferrer"
              className="icon-socials"
            >
              <AiFillTwitterCircle />
              <span className="color-bg-twitter">Twitter</span>
            </a>
            <a
              href="https://www.instagram.com"
              target={"_blank"}
              rel="noreferrer"
              className="icon-socials"
            >
              <BsInstagram />
              <span className="color-bg-instagram">Instagram</span>
            </a>
          </div>
          <a href="mailto:info@wolves.com?Subject=Consulta%20">
            <FiMail />
            {"  "}
            info@wolves.com
          </a>
          <a
            href="https://goo.gl/maps/mnQm11vGEkNi7uR5A"
            target="_blank"
            rel="noreferrer"
          >
            <FiMapPin />
            Av. 16 de julio - Unidad deportiva Belén
          </a>
          <a href="#!" rel="norefferrer" target={""}>
            <FaPhone />
            (604) 3228764
          </a>
        </div>
        <form onSubmit={sendEmail} className="contact-form">
          <ToastContainer />
          <div className="form__content-alta inputs-container">
            <div className="form__content-inputs input-contact-footer">
              <div className="forms_field">
                <input
                  value={userInput.name}
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  className="forms_field-input "
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="form__content-inputs input-contact-footer">
              <div className="forms_field">
                <input
                  value={userInput.email}
                  type="text"
                  name="email"
                  placeholder="Correo"
                  className="forms_field-input"
                  onChange={changeHandler}
                />
              </div>
            </div>
            <textarea
              className="textarea-contact"
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
            <button className="modify__button">Enviar</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
