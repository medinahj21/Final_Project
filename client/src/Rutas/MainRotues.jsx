import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Shop from "../pages/Shop";

import ProtectedRoute from "./ProtectedRoutes";
import ProductDetail from "../components/Shop/ProductDetail/ProductDetail";
import Calendario from "../components/Calendar/Calendario";
import ContactForm from "../components/ContactForm/ContactForm";
import LoginRegisteMob from "../components/Register/LoginRegisterMobile/LoginRegisteMob";

function MainRoutes() {
  const { userInfoFirestore } = useSelector((state) => state.authReducer);
  const { playerDetail } = useSelector((state) => state.playerReducer);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/products"
        element={
          <ProtectedRoute
            isAllowed={!playerDetail.error || userInfoFirestore.isAdmin}
          >
            <Shop />
          </ProtectedRoute>
        }
      />
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
