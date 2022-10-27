import { useState } from "react";
import GroupDetail from "../Groups/GroupDetail/GroupDetail";
import Modal from "../UI/Modal";
import "./GroupsInfo.css";

function GroupsInfo({ position, img, name, schedule, genre, price, id }) {
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
          <GroupDetail id={id} setShowDetail={setShowDetail} allowBack={true}/>
        </Modal>
      )}
    </>
  );
}

export default GroupsInfo;

/*
<div className="blog-card alt">
        <div className="meta">
          <div className="photo photo__teen"></div>
          <ul className="details">
            <li className="author">
              <a href="!">Jane Doe</a>
            </li>
            <li className="date">July. 15, 2015</li>
            <li className="tags">
              <ul>
                <li>
                  <a href="!">Learn</a>
                </li>
                <li>
                  <a href="!">Code</a>
                </li>
                <li>
                  <a href="!">JavaScript</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="description">
          <h1>Mastering the Language</h1>
          <h2>Java is not the same as JavaScript</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
            dolorum architecto obcaecati enim dicta praesentium, quam nobis!
            Neque ad aliquam facilis numquam. Veritatis, sit.
          </p>
          <p className="read-more">
            <a href="!">Read More</a>
          </p>
        </div>
      </div>
      <div className="blog-card">
        <div className="meta">
          <div className="photo photo__elder"></div>
          <ul className="details">
            <li className="author">
              <a href="!">John Doe</a>
            </li>
            <li className="date">Aug. 24, 2015</li>
            <li className="tags">
              <ul>
                <li>
                  <a href="!">Learn</a>
                </li>
                <li>
                  <a href="!">Code</a>
                </li>
                <li>
                  <a href="!">HTML</a>
                </li>
                <li>
                  <a href="!">CSS</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="description">
          <h1>Learning to Code</h1>
          <h2>Opening a door to the future</h2>
          <p>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
            dolorum architecto obcaecati enim dicta praesentium, quam nobis!
            Neque ad aliquam facilis numquam. Veritatis, sit.
          </p>
          <p className="read-more">
            <a href="!">Read More</a>
          </p>
        </div>
      </div>
*/
