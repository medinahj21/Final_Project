import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Player from "./components/Dashboard/Player";
import Register from "./components/Register/Register";
import Login from "./components/Register/Login";
import FormUser from "./components/Register/FormUser";
import Admin from "./components/Dashboard/Admin";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard-player" element={<Player />} />
        <Route path="dashboard-admin" element={<Admin />} />
        <Route path="check-in" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="form-user" element={<FormUser />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
