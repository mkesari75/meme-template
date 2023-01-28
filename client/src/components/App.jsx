import React from "react";
import Home from "../pages/Home";
import GenerateMeme from "../pages/GenerateMeme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Edit from "../pages/Edit";
import Share from "../pages/Share";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<GenerateMeme />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/getsharedphotomeme" element={<Share />} />
        </Routes>
      </Router>
      {/* <Home /> */}
    </>
  );
};

export default App;
