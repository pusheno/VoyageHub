import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import List from "./pages/List";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Property from "./pages/Property";
import User from "./pages/User";
import Panel from "./pages/Panel";
import Listed from "./pages/Listed";
import Add from "./pages/Add";

function App() {

  return (
    <div className="app">
      <Menu />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/property/:id" element={<Property />} />
        <Route path="/user" element={<User />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/listed" element={<Listed />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>
  );
}

export default App;
