import "./Modal.css";

function Modal({ children, clickHandler }) {
  console.log(clickHandler);
  return (
    <div className="container__modal">
      <div onClick={clickHandler} className="closeModal"></div>
      {children}
    </div>
  );
}

export default Modal;
