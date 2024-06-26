import React from "react";
import InternCard from "./InternCard";
// import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import JobCard from "./JobCard";
const InternSlider = ({ type }) => {
  return (
    <div className="flex items-center justify-center p-10">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-[70vw] md:w-[90vw]"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/4 basis:1/2"
            >
              <div className="px-10">
                <CardContent className="flex items-center justify-center">
                  <InternCard type={type} />
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
