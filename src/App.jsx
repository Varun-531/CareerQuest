import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Header />}
      <Outlet />
    </>
  );
};

export default App;
