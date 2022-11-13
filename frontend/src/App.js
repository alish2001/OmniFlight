import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import GlobalNav from "./components/GlobalNav";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import RegisterPage from "./pages/LoginPage/RegisterPage";
import { routes } from "./AllRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
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
