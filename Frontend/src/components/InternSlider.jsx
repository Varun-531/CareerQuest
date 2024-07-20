import React, { useEffect, useState } from "react";
import InternCard from "./InternCard";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HashLoader } from "react-spinners";

const InternSlider = ({ type }) => {
  const [internships, setInternships] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    console.log("...", import.meta.env.VITE_BACKEND_API);
    axios
      .get(import.meta.env.VITE_BACKEND_API + `/all-${type}s`)
      .then((res) => {
        setLoading(false);
        console.log("Fetched internships:", res.data);
        setInternships(res.data.reverse());
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching internships:", err);
        setError("Failed to fetch internships. Please try again later.");
      });
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-opacity-60 bg-slate-200 flex justify-center items-center z-50">
          <HashLoader
            color="#3f3737"
            speedMultiplier={1}
            loading={loading}
            size={30}
          />
        </div>
      )}{" "}
      <div className="flex items-center justify-center md:p-0">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-[70vw] md:w-[90vw]"
        >
          <CarouselContent>
            {internships.map((internship, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/3 lg:basis-1/4 basis:1/2"
              >
                <div>
                  <CardContent className="flex items-center justify-center">
                    <InternCard type={type} internship={internship} />
                  </CardContent>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default InternSlider;
