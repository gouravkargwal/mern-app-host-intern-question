import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddImage from "./components/AddImage";
import EditImage from "./components/EditImage";
import ImageDetail from "./components/ImageDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<AddImage />} />
        <Route path="/:id/edit" element={<EditImage />} />
        <Route path="/show/:id" element={<ImageDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
