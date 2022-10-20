import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import GlobalNav from "./components/GlobalNav";

//Pages
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <GlobalNav />
              <Home />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
