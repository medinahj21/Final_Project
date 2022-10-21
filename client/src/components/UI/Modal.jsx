import "./Modal.css";

function Modal({ children }) {
  return (
    <div className="overlay">
      <div className="container__modal">
        {children}
      </div>
    </div>
  );
}

export default Modal;
