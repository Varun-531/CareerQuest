import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GridPattern from "../components/magicui/animated-grid-pattern"; // Adjust the import path accordingly
import { BackgroundBeams } from "@/components/Acenternity/background-beams";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-[100vh] flex justify-center items-center overflow-hidden">
      <GridPattern className="absolute inset-0 z-0" />
      <div className="relative z-10 flex items-center justify-center flex-col m-auto bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
        <Button className="mt-3" onClick={() => navigate("/dashboard")}>
          Get Started
        </Button>
      </div>
      {/* <BackgroundBeams /> */}
    </div>
  );
};

export default Home;
