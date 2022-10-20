import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Shop from "../pages/Shop/Shop";
import ProtectedRoute from "./ProtectedRoutes";
import ProductDetail from "../pages/Shop/ProductDetail";
import Groups from "../pages/Groups/Groups";
import GroupDetail from "../pages/Groups/GroupDetail/GroupDetail";
import Calendario from "../pages/Calendario/Calendario";

function MainRoutes() {
  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Shop />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/groups" element={<Groups/>}/>
      <Route path="/group/detail/:id" element={<GroupDetail/>}/>
      <Route path="/calendario" element={<Calendario/>}/>
      
      <Route
        path="dashboard-player"
        element={
          <ProtectedRoute isAllowed={!!userInfoFirestore}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard-admin"
        element={
          <ProtectedRoute
            isAllowed={!!userInfoFirestore && userInfoFirestore.isAdmin}
          >
            <Dashboard />
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
