import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Login from "./components/Register/Login";
import FormUser from "./components/Register/FormUser";
import "./App.css";
import Admin from "./components/Dashboard/Admin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admin" element={<Admin />} />
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
