import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Dashboard() {
  const { user, userDB } = useAuth();

  if (!user || !userDB) return <Navigate to={"/"} />;

  console.log(userDB.isAdmin);

  return (
    <div>
      <h1>{userDB.name}</h1>
      <p>{userDB.bloodType}</p>
      <p>{userDB.cell}</p>
      <p>{userDB.document}</p>
      <p>{userDB.emergencyContact}</p>
      <p>{userDB.health}</p>
      <p>{userDB.specialConditions}</p>
      <p>{userDB.years}</p>
    </div>
  );
}

export default Dashboard;
