import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Dashboard() {
  const { user, dbUser } = useAuth();

  console.log({dbUser});
  if (!user || !dbUser) return <Navigate to={"/"} />;

  return (
    <div>
      <h1>{dbUser.name}</h1>
      <p>{dbUser.bloodType}</p>
      <p>{dbUser.cell}</p>
      <p>{dbUser.document}</p>
      <p>{dbUser.emergencyContact}</p>
      <p>{dbUser.health}</p>
      <p>{dbUser.specialConditions}</p>
    </div>
  );
}

export default Dashboard;
