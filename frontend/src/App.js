import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import GlobalNav from "./components/GlobalNav";
import Login from "./components/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Register from "./components/Login/Register";
import { routes } from "./utils/AllRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {routes.map((route) => {
          return (
            <Route
              path={route.path}
              element={
                <ProtectedRoute>
                  <GlobalNav />
                  {route.component}
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
