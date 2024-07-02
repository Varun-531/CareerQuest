import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Banknote, Calendar, ChevronRight, MapPin } from "lucide-react";
import { Button } from "./ui/button";
const JobCard = () => {
  return (
    <Card className="md:w-[30vw] lg:w-[20vw] w-[70vw] h-fit">
      <CardHeader>
        <CardTitle>MERN Stack Developer</CardTitle>
        <CardDescription>Unlock the potential within you</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center font-semibold pb-2">
        Varun Solutions
        <img
          src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGpvYnN8ZW58MHx8MHx8fDA%3D"
          alt=""
          className="w-[50px] h-[50px] rounded"
        />
      </CardContent>
      <Separator className="my-3" />
      <CardContent className="flex text-sm gap-1 items-center pb-2 font-semibold">
        <MapPin className="h-4" />
        Kakinada
      </CardContent>
      <CardContent className="flex text-sm gap-1 items-center pb-2 font-semibold">
        <Banknote className="h-4" />
        $130
      </CardContent>
      <CardContent className="flex text-sm gap-1 items-center pb-2 font-semibold">
        <Calendar className="h-4" />6 Months
      </CardContent>
      <CardFooter className="flex items-center font-semibold text-sky-600 text-xs mb-1 mx-2 justify-between p-0">
        <Badge variant="secondary">Job</Badge>
        <div className="w-fit flex items-center cursor-pointer">
          View Details . .
          <ChevronRight className="h-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
