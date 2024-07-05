import React from "react";
import { Banknote, CalendarRange, MapPin } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useNavigate } from "react-router-dom";
const InternSlimCard = ({ props }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    if (id) {
      console.log("Navigating to internship with ID:", id);
      navigate(`/internships/${id}`, { state: { id } });
    } else {
      console.error("Invalid internship ID:", id);
    }
  };
  return (
    <div
      className="flex pr-2 items-center cursor-pointer"
      onClick={() => handleClick(props._id)}
    >
      <div className="p-3 m-3 mt-0 rounded-sm bg-slate-100 dark:bg-slate-800 group hover:scale-105 flex flex-col gap-1 w-[100%] relative">
        <h2 className="text-lg font-medium">{props.title}</h2>
        <p className="text-sm text-gray-400 dark:text-gray-100 font-semibold">
          {props.companyName}
        </p>
        <div className="flex p-1 gap-3">
          <h3 className="flex gap-1 items-center font-semibold text-xs text-gray-600">
            <MapPin className="text-gray-400 dark:text-gray-100" size={15} />
            {props.location}
          </h3>
          <h3 className="flex gap-1 items-center font-semibold text-xs text-gray-600">
            <CalendarRange
              className="text-gray-400 dark:text-gray-100"
              size={15}
            />
            {props.duration} months
          </h3>
          <h3 className="flex gap-1 items-center font-semibold text-xs text-gray-600">
            <Banknote className="text-gray-400 dark:text-gray-100" size={15} />
            {props.stipend}
          </h3>
        </div>
        <img
          src={props.companyLogo}
          alt="logo"
          className="w-[5vw] aspect-square absolute right-4 top-5 rounded-sm group-hover:scale-105"
        />
      </div>
    </div>
  );
};

export default InternSlimCard;
