import "./Modal.css";

function Modal({ children, onClick }) {
  return (
    <div className="container__modal">
      <div onClick={onClick} className={onClick ? "closeModal" : ""}></div>
      {children}
    </div>
  );
}

export default Modal;
