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

const AllInternships = () => {
  const [internships, setInternships] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/all-internships")
      .then((res) => {
        console.log("Fetched internships:", res.data);
        setInternships(res.data);
      })
      .catch((err) => {
        console.error("Error fetching internships:", err);
        setError("Failed to fetch internships. Please try again later.");
      });
  }, []);

  return (
    <>
      <div className="p-7">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                Internships
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="p-5 pt-0">
        <h2 className="text-center font-semibold text-2xl">
          {internships.length} internships available
        </h2>
        <div className="flex gap-3 justify-center  p-4">
          <div className="w-[25vw] bg-slate-100 dark:bg-slate-800 rounded-sm p-5">
            Filters
          </div>
          <div className="w-[40vw] rounded-sm">
            {internships.map((array) => {
              return <InternSlimCard props={array} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllInternships;
