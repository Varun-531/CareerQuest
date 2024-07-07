// import React, { useEffect, useState } from "react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import axios from "axios";
// import InternSlimCard from "@/components/InternSlimCard";
// import { HashLoader } from "react-spinners";
// import { jobSlimCard } from "@/components/jobSlimCard";
// const AllJobs = () => {
//   const [internships, setInternships] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("http://localhost:4000/all-jobs")
//       .then((res) => {
//         console.log("Fetched internships:", res.data);
//         setInternships(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching internships:", err);
//         setError("Failed to fetch internships. Please try again later.");
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <>
//       {loading && (
//         <div className="fixed top-0 left-0 h-full w-full bg-opacity-60 bg-slate-200 flex justify-center items-center z-50">
//           <HashLoader
//             color="#3f3737"
//             speedMultiplier={1}
//             loading={loading}
//             size={30}
//           />
//         </div>
//       )}
//       <div className="p-7">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink
//                 className="font-semibold cursor-pointer"
//                 href="/dashboard"
//               >
//                 Home
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage className="font-semibold cursor-pointer">
//                 Jobs
//               </BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div>

//       <div className="p-5 pt-0">
//         <h2 className="text-center font-semibold text-2xl">
//           {internships.length} jobs available
//         </h2>
//         <div className="flex gap-3 justify-center  p-4">
//           <div className="w-[25vw] bg-slate-100 dark:bg-slate-800 rounded-sm p-5">
//             Filters
//           </div>
//           <div className="w-[40vw] rounded-sm">
//             {internships.map((array, index) => {
//               return <jobSlimCard props={array} key={index} />;
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AllJobs;

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import axios from "axios";
import InternSlimCard from "@/components/InternSlimCard";
import { HashLoader } from "react-spinners";
import JobSlimCard from "../components/jobSlimCard";

const AllJobs = () => {
  const [internships, setInternships] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/all-jobs")
      .then((res) => {
        console.log("Fetched internships:", res.data);
        setInternships(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching internships:", err);
        setError("Failed to fetch internships. Please try again later.");
        setLoading(false);
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
      )}
      <div className="p-7">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="font-semibold cursor-pointer"
                href="/dashboard"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold cursor-pointer">
                Jobs
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="p-5 pt-0">
        <h2 className="text-center font-semibold text-2xl">
          {internships.length} jobs available
        </h2>
        <div className="flex gap-3 justify-center p-4">
          <div className="w-[25vw] bg-slate-100 dark:bg-slate-800 rounded-sm p-5">
            Filters
          </div>
          <div className="w-[40vw] rounded-sm">
            {internships.map((array, index) => (
              <JobSlimCard key={index} props={array} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllJobs;
