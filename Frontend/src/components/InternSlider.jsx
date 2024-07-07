// import React, { useEffect, useState } from "react";
// import InternCard from "./InternCard";
// // import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import axios from "axios";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import JobCard from "./JobCard";

// const InternSlider = ({ type }) => {
//   const [interships, setInternships] = useState([]);
//   useEffect(() => {
//     // setLoading(true);
//     axios
//       .get("http://localhost:4000/all-internships")
//       .then((res) => {
//         console.log("Fetched internships:", res.data);
//         setInternships(res.data);
//         // setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching internships:", err);
//         setError("Failed to fetch internships. Please try again later.");
//         // setLoading(false);
//       });
//   }, []);
//   return (
//     <div className="flex items-center justify-center p-10">
//       <Carousel
//         opts={{
//           align: "start",
//         }}
//         className="w-[70vw] md:w-[90vw]"
//       >
//         <CarouselContent>
//           {Array.from({ length: 5 }).map((_, index) => (
//             <CarouselItem
//               key={index}
//               className="md:basis-1/3 lg:basis-1/4 basis:1/2"
//             >
//               <div className="">
//                 <CardContent className="flex items-center justify-center">
//                   <InternCard type={type} />
//                 </CardContent>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// };

// export default InternSlider;

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
    axios
      .get(`http://localhost:4000/all-${type}s`)
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
    <div className="flex items-center justify-center p-10">
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
