import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/admin";
// import { useAuth } from "../../context/authContext";

function Admin() {
  const dispatch = useDispatch();
  const userDB = useSelector((state) => state.allUsers);

  // const { getAllInfoUser, userDB } = useAuth();
  // const [dbUser, setDbUser] = useState(null);

  // useEffect(() => {
  //   const fetchUserDb = async () => {
  //     const userDB = await getAllInfoUser();
  //     setDbUser(userDB);
  //   };
  //   fetchUserDb();
  // }, [getAllInfoUser]);
  // console.log(dbUser);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log(userDB);

  if (!userDB) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      {userDB?.map((user) => {
        return <h2>{user.name}</h2>;
      })}
    </div>
  );
}

export default Admin;
