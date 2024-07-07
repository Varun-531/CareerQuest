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
import { Banknote, Calendar, ChevronRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InternCard = ({ type, internship }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (id) {
      const term = type === "Internship" ? "internships" : "jobs";
      console.log("Navigating to internship with ID:", id);
      navigate(`/${term}/${id}`, { state: { id } });
    } else {
      console.error("Invalid internship ID:", id);
    }
  };

  const formatSalary = (salary) => {
    if (salary !== undefined && salary !== null) {
      return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "N/A"; // Return "N/A" or any other default value if salary is undefined
  };

  return (
    <div>
      <Card className="md:w-[30vw] lg:w-[20vw] w-[70vw] h-fit group hover:scale-105 mt-10">
        <CardHeader>
          <CardTitle className="truncate max-w-full">
            {internship.title}
          </CardTitle>
          <CardDescription className="truncate max-w-full">
            {internship.companyName}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center font-semibold pb-2">
          <h1 className="truncate max-w-full">{internship.companyName}</h1>
          <img
            src={internship.companyLogo}
            alt=""
            className="w-[50px] h-[50px] rounded group-hover:scale-105 object-cover"
          />
        </CardContent>
        <Separator className="my-3" />
        <CardContent className="flex text-sm gap-1 items-center pb-2 font-semibold">
          <MapPin className="h-4" />
          <span className="truncate max-w-full">{internship.location}</span>
        </CardContent>
        <CardContent className="flex text-sm gap-1 items-center pb-2 font-semibold">
          <Banknote className="h-4" />
          {type === "Internship" ? (
            <>{formatSalary(internship.stipend)}</>
          ) : (
            <>{formatSalary(internship.salary)}</>
          )}
        </CardContent>
        {type === "Internship" && (
          <CardContent className="flex text-sm gap-1 items-center pb-2 font-semibold">
            <Calendar className="h-4" />
            {internship.duration} Months
          </CardContent>
        )}
        <CardFooter className="flex items-center font-semibold text-sky-600 text-xs mb-2 mx-2 justify-between p-0">
          <Badge variant="secondary">{type}</Badge>
          <div
            className="w-fit flex items-center cursor-pointer"
            onClick={() => handleClick(internship._id)}
          >
            View Details . .
            <ChevronRight className="h-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InternCard;
