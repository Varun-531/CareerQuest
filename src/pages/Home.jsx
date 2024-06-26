import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="flex items-center justify-center flex-col m-auto">
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
        <Button className="mt-3" onClick={() => navigate("/dashboard")}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Home;
