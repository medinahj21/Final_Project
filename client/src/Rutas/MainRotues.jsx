import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FormUser from "../components/Register/FormUser";
import Player from "../pages/Player";
import Admin from "../pages/Admin";
import ProtectedRoute from "./ProtectedRoutes";
import Groups from "../pages/Groups/Groups";
import GroupDetail from "../components/GroupDetail/GroupDetail";

function MainRoutes() {
  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="check-in" element={<Register />} />
      <Route path="form-user" element={<FormUser />} />
      <Route path="/groups" element={<Groups/>}/>
      <Route path="/group/detail/:id" element={<GroupDetail/>}/>
      <Route
        path="dashboard-player"
        element={
          <ProtectedRoute isAllowed={!!userInfoFirestore}>
            <Player />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard-admin"
        element={
          <ProtectedRoute
            isAllowed={!!userInfoFirestore && userInfoFirestore.isAdmin}
          >
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
}

export default MainRoutes;
