import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Admin() {
  const { getAllInfoUser, userDB } = useAuth();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const fetchUserDb = async () => {
      const userDB = await getAllInfoUser();
      setDbUser(userDB);
    };
    fetchUserDb();
  }, [getAllInfoUser]);
  console.log(dbUser);

  if (!userDB) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      {dbUser?.map((user) => {
        return <h2>{user.name}</h2>;
      })}
    </div>
  );
}

export default Admin;
