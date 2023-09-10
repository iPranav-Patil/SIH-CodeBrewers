import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import { Dashboard } from "./Dashboard.jsx";
import { BookRake } from "./BookRake.jsx";

//Components
import { Navbar } from "./components/Navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<BookRake />} />
      </Routes>
    </BrowserRouter>
    <App />
  </React.StrictMode>
);
