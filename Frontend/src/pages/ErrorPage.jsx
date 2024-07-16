import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-full h-[85vh] flex justify-center items-center flex-col">
      <img src="/404.png" alt="Error_img" className="w-1/2" />
      <h1 className="font-semibold text-xl">
        Return to Home?{" "}
        <Link className="text-blue-500 hover:text-blue-600" to="/">
          Click Here
        </Link>
      </h1>
    </div>
  );
};

export default ErrorPage;
