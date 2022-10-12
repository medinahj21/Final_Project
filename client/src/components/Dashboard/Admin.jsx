import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";

function Admin() {
  const { getAllInfoUser } = useAuth();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const fetchUserDb = async () => {
      const userDB = await getAllInfoUser();
      setDbUser(userDB);
    };
    fetchUserDb();
  }, []);
  console.log(dbUser);
  return <div>
    {dbUser?.map(user => {
        return <h2>{user.name}</h2>
    } )}
  </div>;
}

export default Admin;
