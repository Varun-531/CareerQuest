import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Header2 from "./components/Header2";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname !== "/" && <Header2 />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};

export default App;
