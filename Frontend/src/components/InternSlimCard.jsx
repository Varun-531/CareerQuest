// import React from "react";
// import { Banknote, CalendarRange, Dot, History, MapPin } from "lucide-react";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { useNavigate } from "react-router-dom";
// import { format } from "timeago.js";
// import { Badge } from "./ui/badge";

// const InternSlimCard = ({ props }) => {
//   const navigate = useNavigate();
//   const formatSalary = (salary) => {
//     return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };
//   const handleClick = (id) => {
//     if (id) {
//       console.log("Navigating to internship with ID:", id);
//       navigate(`/internships/${id}`, { state: { id } });
//     } else {
//       console.error("Invalid internship ID:", id);
//     }
//   };

//   return (
//     <div
//       className="flex pr-2 items-center cursor-pointer"
//       onClick={() => handleClick(props._id)}
//     >
//       <div className="p-3 m-3 mt-0 rounded-sm shadow-md dark:bg-slate-800 group hover:scale-105 flex flex-col gap-1 w-[100%] relative">
//         <h2 className="text-lg font-medium">{props.title}</h2>
//         <p className="text-sm text-gray-400 dark:text-gray-100 font-semibold">
//           {props.companyName}
//         </p>
//         <div className="flex p-1 my-2 gap-3">
//           <h3 className="flex gap-1 items-center font-semibold text-sm text-gray-600 dark:text-gray-300">
//             <MapPin
//               className="text-gray-400 dark:text-gray-300"
//               size={20}
//               strokeWidth={1}
//             />
//             {props.location}
//           </h3>
//           <h3 className="flex gap-1 items-center font-semibold text-sm text-gray-600 dark:text-gray-300">
//             <CalendarRange
//               className="text-gray-400 dark:text-gray-100"
//               strokeWidth={1}
//               size={20}
//             />
//             {props.duration} months
//           </h3>
//           <h3 className="flex gap-1 items-center font-semibold text-sm text-gray-600 dark:text-gray-300">
//             <Banknote
//               className="text-gray-400 dark:text-gray-100"
//               strokeWidth={1}
//               size={20}
//             />
//             {formatSalary(props.salary)}
//           </h3>
//         </div>
//         <div>
//           <div className="flex gap-5 items-center">
//             <div className="bg-green-200 text-black p-1 rounded w-fit">
//               <h1 className="flex gap-1 items-center text-xs font-semibold">
//                 <History className="" size={15} strokeWidth={2} />{" "}
//                 {format(props.createdAt)}
//               </h1>
//             </div>
//             <div>
//               {props.job && (
//                 <h2 className="text-xs flex items-center font-semibold text-gray-500">
//                   <Dot />
//                   Internship with job offer
//                 </h2>
//               )}
//             </div>
//           </div>
//         </div>
//         <img
//           src={props.companyLogo}
//           alt="logo"
//           className="w-[5vw] aspect-square object-cover absolute right-4 top-5 rounded-sm group-hover:scale-105"
//         />
//       </div>
//     </div>
//   );
// };

// export default InternSlimCard;

import React from "react";
import { Banknote, CalendarRange, Dot, History, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";

const InternSlimCard = ({ props }) => {
  const navigate = useNavigate();

  const formatSalary = (salary) => {
    if (salary !== undefined && salary !== null) {
      return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "N/A"; // Return "N/A" or any other default value if salary is undefined
  };

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
      <div className="p-3 md:m-3 mt-0 rounded-sm shadow-md dark:bg-gray-900 group hover:scale-105 flex flex-col gap-1 w-[100%] relative">
        <h2 className="text-lg font-medium">{props.title}</h2>
        <p className="text-sm text-gray-400 dark:text-gray-100 font-semibold">
          {props.companyName}
        </p>
        <div className="md:flex space-y-2 md:space-y-0 p-1 my-2 gap-3">
          <h3 className="flex gap-1 items-center font-semibold text-sm text-gray-600 dark:text-gray-300">
            <MapPin
              className="text-gray-400 dark:text-gray-300"
              size={20}
              strokeWidth={1}
            />
            {props.location}
          </h3>
          <h3 className="flex gap-1 items-center font-semibold text-sm text-gray-600 dark:text-gray-300">
            <CalendarRange
              className="text-gray-400 dark:text-gray-100"
              strokeWidth={1}
              size={20}
            />
            {props.duration} months
          </h3>
          <h3 className="flex gap-1 items-center font-semibold text-sm text-gray-600 dark:text-gray-300">
            <Banknote
              className="text-gray-400 dark:text-gray-100"
              strokeWidth={1}
              size={20}
            />
            {formatSalary(props.stipend)}
          </h3>
        </div>
        <div>
          <div className="md:flex hidden gap-5 items-center">
            <div className="bg-green-200 dark:bg-green-900 text-black p-1 rounded w-fit">
              <h1 className="flex gap-1 items-center text-xs font-semibold dark:text-white">
                <History className="" size={15} strokeWidth={2} />{" "}
                {format(props.createdAt)}
              </h1>
            </div>
            <div>
              {props.job && (
                <h2 className="text-xs flex items-center font-semibold text-gray-500 dark:text-gray-300">
                  <Dot />
                  Internship with job offer
                </h2>
              )}
            </div>
          </div>
          <div className="md:hidden gap-5 items-center">
            <div>
              {props.job && (
                <h2 className="text-xs flex items-center font-semibold text-gray-500">
                  <Dot />
                  Internship with job offer
                </h2>
              )}
            </div>
            <div className="bg-green-200 text-black p-1 rounded w-fit">
              <h1 className="flex gap-1 items-center text-xs font-semibold">
                <History className="" size={15} strokeWidth={2} />{" "}
                {format(props.createdAt)}
              </h1>
            </div>
          </div>
        </div>
        <img
          src={props.companyLogo}
          alt="logo"
          className="md:w-[5vw] w-[10vw] aspect-square object-cover absolute right-4 md:top-5 top-20 rounded-sm group-hover:scale-105"
        />
      </div>
    </div>
  );
};

export default InternSlimCard;
