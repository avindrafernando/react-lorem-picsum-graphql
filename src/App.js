import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar></NavBar>
    </Router>
  );
}

export default App;
