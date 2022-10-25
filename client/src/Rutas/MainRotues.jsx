import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Shop from "../pages/Shop/Shop";
import ProtectedRoute from "./ProtectedRoutes";
import ProductDetail from "../pages/Shop/ProductDetail";
import Calendario from "../pages/Calendario/Calendario";
import ContactForm from "../components/ContactForm/ContactForm";
import LoginRegisteMob from "../components/Register/LoginRegisterMobile/LoginRegisteMob";

function MainRoutes() {
  const { userInfoFirestore } = useSelector((state) => state.authReducer);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login2" element={<LoginRegisteMob />} />
      <Route path="/products" element={<Shop />} />
      {/*Prueba del Cart*/}
      <Route path= "/contacto" element={<ContactForm/>} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/calendario" element={<Calendario />} />

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
