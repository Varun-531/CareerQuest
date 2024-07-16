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

const InternSlider = ({ type }) => {
  const [internships, setInternships] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("...", import.meta.env.VITE_BACKEND_API);
    axios
      .get(import.meta.env.VITE_BACKEND_API + `/all-${type}s`)
      .then((res) => {
        console.log("Fetched internships:", res.data);
        setInternships(res.data.reverse());
      })
      .catch((err) => {
        console.error("Error fetching internships:", err);
        setError("Failed to fetch internships. Please try again later.");
      });
  }, []);

  return (
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
  );
};

export default InternSlider;
