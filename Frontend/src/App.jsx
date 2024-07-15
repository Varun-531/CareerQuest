import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Header2 from "./components/Header2";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Header2 />}
      <Outlet />
    </>
  );
};

export default App;
