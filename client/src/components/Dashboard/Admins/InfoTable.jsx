import InfoRow from "./InfoRow";

import "../Request.css";

function InfoTable({ admin, users }) {
  return (
    <div className="table">
      <div className={admin ? "row blue header" : "row header"}>
        <div className="cell">Foto</div>
        <div className="cell">Nombre</div>
        <div className="cell">Correo</div>
        <div className="cell"></div>
        <div className="cell"></div>
      </div>
      {users.map((user) => {
        return <InfoRow user={user} />;
      })}
    </div>
  );
}

export default InfoTable;
