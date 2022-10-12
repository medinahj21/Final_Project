import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Dashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to={'/'}/> 

  return <div>Dashboard</div>;
}

export default Dashboard;
