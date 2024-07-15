import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Eye, SquareArrowOutUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";
import SideBar from "@/components/SideBar";

const Applications = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [jobs, setJobs] = useState([]);
  const { user, isLoaded, isSignedIn } = useUser();
  const [internshipDetails, setInternshipDetails] = useState({});
  const [jobDetails, setJobDetails] = useState({});
  const [resume, setResume] = useState(null);
  const [isResumePresent, setIsResumePresent] = useState(false);
  const [existingResume, setExistingResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkResume = async () => {
    if (isSignedIn && isLoaded && user?.id) {
      try {
        const res = await axios.get(
          `http://localhost:4000/resume-present/${user.id}`
        );
        if (res.status === 200) {
          setIsResumePresent(true);
          setExistingResume(res.data.resume);
          console.log("existing", existingResume);
        } else {
          setIsResumePresent(false);
        }
      } catch (error) {
        console.error("Error checking resume presence:", error);
        setIsResumePresent(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isSignedIn && isLoaded && user?.id) {
          setLoading(true);
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
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [isSignedIn, isLoaded, user?.id]);

  useEffect(() => {
    checkResume();
  }, [isSignedIn, isLoaded, user?.id]);

  const handleResumeSubmit = async (e) => {
    if (!resume) {
      e.preventDefault();
      toast.error("Please select a file to upload.");
      return;
    }
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("clerkId", user.id);

    try {
      await axios.post("http://localhost:4000/add-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Resume submitted");
      toast.success("Resume uploaded successfully.");
      setLoading(false);
      setResume(null);
      checkResume();
    } catch (error) {
      console.error("Error submitting resume:", error);
      setLoading(false);
    }
  };

  const handleViewResume = () => {
    // Open a new tab to view the resume
    if (isResumePresent) {
      window.open(existingResume, "_blank");
    } else {
      console.error("No resume available to view.");
    }
  };

  return (
    <div className="px-6">
      {isSignedIn ? (
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
          <div className="p-7 flex justify-between">
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
            <SideBar />
          </div>
          <div className="p-10 pt-0 font-semibold text-3xl text-center">
            Your Applications
          </div>
          {internships.length > 0 && (
            <div className="p-10 pt-3 flex flex-col gap-2">
              <h1 className="text-xl font-bold">Internship Applications</h1>
              <Table className="border rounded">
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
          )}
          {jobs.length > 0 && (
            <div className="p-10 pt-3 flex flex-col gap-2">
              <h1 className="text-xl font-bold">Job Applications</h1>
              <Table className="border rounded">
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
                    <TableRow key={index} className="h-10">
                      <TableCell className="">{index + 1}</TableCell>
                      <TableCell className="flex gap-1 items-center">
                        {jobDetails[job._id]?.title}
                        <SquareArrowOutUpRight
                          size={10}
                          className="mt-1 text-sky-600 cursor-pointer"
                          onClick={() => navigate(`/jobs/${job.jobId}`)}
                        />
                      </TableCell>
                      <TableCell>{jobDetails[job._id]?.companyName}</TableCell>
                      <TableCell>{jobDetails[job._id]?.location}</TableCell>
                      <TableCell>{job?.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
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
    </div>
  );
};

export default Applications;
