import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SquareArrowOutUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [jobs, setJobs] = useState([]);
  const { user, isLoaded, isSignedIn } = useUser();
  const [internshipDetails, setInternshipDetails] = useState({});
  const [jobDetails, setJobDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isSignedIn && isLoaded && user?.id) {
          const res = await axios.get(
            `http://localhost:4000/fetch-applications/${user.id}`
          );
          setInternships(res.data.internships);
          setJobs(res.data.jobs);
          console.log("Internships", res.data.internships);
          console.log("Jobs", res.data.jobs);
          await Promise.all(
            res.data.internships.map(async (internship) => {
              const details = await axios.get(
                `http://localhost:4000/fetch-internship/${internship.internId}`
              );
              setInternshipDetails((prevDetails) => ({
                ...prevDetails,
                [internship._id]: details.data,
              }));
            })
          );
          await Promise.all(
            res.data.jobs.map(async (job) => {
              const details = await axios.get(
                `http://localhost:4000/fetch-job/${job.jobId}`
              );
              setJobDetails((prevDetails) => ({
                ...prevDetails,
                [job._id]: details.data,
              }));
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isSignedIn, isLoaded, user?.id]);

  return (
    <>
      {isSignedIn ? (
        <>
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
                    Applications
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="p-10 pt-0 font-semibold text-3xl text-center">
            Your Applications
          </div>
          <div className="p-10 pt-3 flex flex-col gap-2">
            <h1 className="text-xl font-bold">Internship Applications</h1>
            <Table className="border rounded">
              {/* <TableCaption>Internship Applications</TableCaption> */}
              <TableHeader className="">
                <TableRow className="">
                  <TableHead className="text-black font-semibold text-lg p-2 w-[5vw]">
                    Sl.no
                  </TableHead>
                  <TableHead className="text-black font-semibold text-lg p-2 w-[25vw]">
                    Internship Name
                  </TableHead>
                  <TableHead className="text-black font-semibold text-lg p-2 w-[25vw]">
                    Company Name
                  </TableHead>
                  <TableHead className="text-black font-semibold text-lg p-2 w-[10vw]">
                    Location
                  </TableHead>
                  <TableHead className="text-black font-semibold text-lg p-2 w-[15vw]">
                    Application Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {internships.map((internship, index) => (
                  <TableRow key={index} className="h-10">
                    <TableCell className="">{index + 1}</TableCell>
                    <TableCell className="flex gap-1 items-center">
                      {internshipDetails[internship._id]?.title}
                      <SquareArrowOutUpRight
                        size={10}
                        className="mt-1 text-sky-600 cursor-pointer"
                        onClick={() =>
                          navigate(`/internships/${internship.internId}`)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {internshipDetails[internship._id]?.companyName}
                    </TableCell>
                    <TableCell>
                      {internshipDetails[internship._id]?.location}
                    </TableCell>
                    <TableCell>{internship?.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-10 pt-3 flex flex-col gap-2">
            <h1 className="text-xl font-bold">Job Applications</h1>
            <Table className="border rounded">
              {/* <TableCaption>Job Applications</TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black font-semibold text-lg p-2 w-[5vw]">
                    Sl.no
                  </TableHead>
                  <TableHead className="text-black font-semibold text-lg p-2 w-[25vw]">
                    Job Name
                  </TableHead>
                  <TableHead className="text-black font-semibold text-lg p-2 w-[25vw]">
                    Company Name
                  </TableHead>
                  <TableHead className="text-black font-semibold text-lg p-2 w-[10vw]">
                    Location
                  </TableHead>
                  <TableHead className="text-black font-semibold text-lg p-2 w-[15vw]">
                    Application Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="flex gap-1 items-center">
                      {jobDetails[job._id]?.title}
                      <SquareArrowOutUpRight
                        size={10}
                        className="mt-1 text-sky-600 cursor-pointer"
                        onClick={() => navigate(`/jobs/${job.internId}`)}
                      />
                    </TableCell>
                    <TableCell>{jobDetails[job._id]?.companyName}</TableCell>
                    <TableCell>{jobDetails[job._id]?.location}</TableCell>
                    <TableCell>{job.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <div className="h-[80vh] w-full flex flex-col items-center justify-center">
          <img
            className="w-[40vw]"
            src="tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration.png"
            alt=""
          />
          <h1 className="font-semibold text-xl">
            Please Sign in to view Applications
          </h1>
        </div>
      )}
    </>
  );
};

export default Applications;
