import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import Home from "./pages/Home";
import { HashRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout";
import StoragePage from "./pages/Storage";

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="storage" element={<StoragePage />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
