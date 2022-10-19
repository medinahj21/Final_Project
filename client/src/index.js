import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//import dotenv from "dotenv";
import "./index.css";


import axios from "axios";
//const dotenv = require('dotenv-webpack');
//dotenv.config();

console.log(process.env);

axios.defaults.baseURL = "https://club-app-deploy.herokuapp.com/" || "http://localhost:3001";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
