import React from "react";
import { useEffect } from "react";
import Nav from "../Nav/Nav";
import { useAuth } from "../../context/authContext";

function Home() {
  const { userDB, getInfoUser } = useAuth();

  useEffect(() => {
    if (!userDB) {
      getInfoUser();
    }
  }, [userDB, getInfoUser]);

  return (
    <div>
      <Nav />
    </div>
  );
}

export default Home;
