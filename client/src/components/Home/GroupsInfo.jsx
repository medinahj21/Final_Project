import { useState } from "react";
import GroupDetail from "../Groups/GroupDetail/GroupDetail";
import Modal from "../UI/Modal";
import "./GroupsInfo.css";

function GroupsInfo({
  position,
  img,
  name,
  schedule,
  genre,
  price,
  id,
  setShowLogin,
  setShowRegister,
}) {
  const [showDetail, setShowDetail] = useState(false);

  const imageBG = {
    background: `url(${img})`,
    backgroundSize: "cover",
  };

  const positionCard = position === "alt" ? "left" : "right";

  return (
    <>
      <div className={`blog-card ${position} ${positionCard}`}>
        <div className="meta">
          <div className="photo" style={imageBG}></div>
          <ul className="details">
            <li className="tags">
              <a href="#!">Precio inscripción</a>
            </li>
            <li className="tags">
              <a href="#!">$ {price}</a>
            </li>
          </ul>
        </div>
        <div className="description">
          <h2>{genre}</h2>
          <h3>{name}</h3>
          <p>{schedule}</p>
          <p className="read-more">
            <a href="#!" onClick={() => setShowDetail(true)}>
              Lee mas
            </a>
          </p>
        </div>
      </div>
      {showDetail && (
        <Modal>
          <GroupDetail
            id={id}
            setShowDetail={setShowDetail}
            allowBack={true}
            setShowRegister={setShowRegister}
            setShowLogin={setShowLogin}
          />
        </Modal>
      )}
    </>
  );
}

export default GroupsInfo;
