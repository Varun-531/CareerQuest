import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { format } from "timeago.js";
import {
  Banknote,
  Calendar,
  Dot,
  History,
  Hourglass,
  MapPin,
  Play,
  Users2Icon,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import SideBar from "@/components/SideBar";

const JobDetail = () => {
  const { id } = useParams();
  const { isSignedIn, user, isLoaded } = useUser();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [applied, setApplied] = useState(false);
  const [resume, setResume] = useState(false);

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_API}/resume-present/${user.id}`)
        .then((res) => {
          if (res.status === 200) {
            setResume(true);
          }
          console.log("Resume", res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isSignedIn, isLoaded, user]);
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log("jobId", id);
      console.log("clerkId", user.id);
      axios
        .post(`${import.meta.env.VITE_BACKEND_API}/check-job-application`, {
          jobId: id,
          clerkId: user.id,
        })
        .then((res) => {
          setApplied(res.data.applied);
          console.log("Applied", res.data.applied);
          // toast("Applied Successfully");
        })
        .catch((err) => {
          console.log(err);
          toast("Error Applying");
        });

      setAdmin(user.publicMetadata?.role === "admin");
    }
  }, [isLoaded, isSignedIn, user, id]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/fetch-job/${id}`)
      .then((res) => {
        setJob(res.data);
        setLoading(false);
        console.log("Fetched job:", res.data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (error) {
    return <div>Error fetching job: {error.message}</div>;
  }

  if (!job) {
    return <div>No job found</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatSalary = (salary) => {
    return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleApply = () => {
    if (isSignedIn) {
      // console.log("jobId", job._id);
      // console.log("clerkId", user.id);
      setLoading(true);
      axios
        .post(`${import.meta.env.VITE_BACKEND_API}/apply-job`, {
          jobId: job._id,
          clerkId: user.id,
        })
        .then((res) => {
          setApplied(true);
          setLoading(false);
          console.log(res);
          toast("Applied Successfully");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast("Error Applying");
        });
    } else {
      toast("Please sign in to apply");
    }
  };
  const openSideBar = () => {
    if (SignedIn) {
      setTimeout(() => {
        const resumeElement = document.getElementById("resume");
        if (resumeElement) {
          resumeElement.click();
        } else {
          console.error("Resume element not found");
        }
      }, 100);
    } else {
      toast.eror("Please sign in to upload resume");
    }
  };
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
      <div className="md:p-7 p-3 md:flex justify-between space-y-4 md:space-y-0 items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/dashboard"
                className="font-semibold cursor-pointer"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="font-semibold cursor-pointer"
                href="/jobs"
              >
                Jobs
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                {job.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SideBar />
      </div>

      <div className="md:p-10 md:px-20 p-3">
        <h1 className="text-center font-semibold md:text-4xl text-xl">
          {job.title} job
        </h1>
        <div className="relative dark:bg-gray-900 shadow mt-10 p-5 rounded-lg">
          <div>
            <h1 className="font-semibold text-lg ">{job.title}</h1>
            <h1 className="font-semibold text-gray-400 ">{job.companyName}</h1>
            <h1 className="mt-4 items-center flex font-semibold text-gray-600 text-sm gap-1 dark:text-gray-100 ">
              <MapPin strokeWidth={2} size={20} />
              {job.location}
            </h1>
            <div className="mt-4 flex gap-[6vw] md:flex-nowrap flex-wrap">
              <div className="flex flex-col items-baseline">
                <h2 className="flex gap-1 text-sm items-center font-semibold text-gray-400">
                  <Play strokeWidth={2} size={15} />
                  Start Date
                </h2>
                <p className="text-gray-600 text-sm font-semibold dark:text-gray-200 ">
                  {formatDate(job.startDate)}
                </p>
              </div>
              {/* <div className="flex flex-col items-baseline">
                <h2 className="flex gap-1 text-sm items-center font-semibold text-gray-400">
                  <Calendar strokeWidth={2} size={15} />
                  Duration
                </h2>
                <p className="text-gray-600 text-sm font-semibold">
                  {job.duration} Months
                </p>
              </div> */}
              <div className="flex flex-col items-baseline">
                <h2 className="flex gap-1 text-sm items-center font-semibold text-gray-400">
                  <Banknote strokeWidth={2} size={15} />
                  Salary{job.ctc && <span> (CTC)</span>}
                </h2>
                <p className="text-gray-600 text-sm font-semibold dark:text-gray-200 ">
                  {formatSalary(job.salary)} Rupees
                </p>
              </div>
              <div className="flex flex-col items-baseline">
                <h2 className="flex gap-1 text-sm items-center font-semibold text-gray-400">
                  <Hourglass strokeWidth={2} size={15} />
                  Apply By
                </h2>
                <p className="text-gray-600 text-sm font-semibold dark:text-gray-200 ">
                  {formatDate(job.applyBy)}
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-center mt-3">
              <h2 className="mt-3 flex items-center gap-1 text-xs font-semibold bg-slate-200 text-gray-500 w-fit p-1 py-1 rounded">
                <History className="" size={15} strokeWidth={2} /> Posted{" "}
                {format(job.createdAt)}
              </h2>
              {job.fresherJob && (
                <h2 className="text-xs flex items-center font-semibold mt-3 bg-slate-200 p-1 rounded text-gray-500">
                  fresher job
                </h2>
              )}
            </div>
            <div className="my-3">
              <h1 className="flex gap-2 items-center text-sm">
                <Users2Icon strokeWidth={1} size={20} />
                {job.appliedPeople.length} applications
              </h1>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-lg ">About job</h1>
              <p className="text-gray-600 text-sm text-justify">
                {job.aboutJob}
              </p>
            </div>
            <div>
              <h1 className="font-semibold text-lg mt-5 mb-1">Perks</h1>
              <div className="flex flex-wrap gap-5">
                {job.perks.map((perk, index) => (
                  <h1
                    key={index}
                    className="bg-slate-200 w-fit p-1 m-1 rounded-lg font-semibold text-sm text-gray-700"
                  >
                    {perk}
                  </h1>
                ))}
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-lg mt-5 mb-1">Who can apply</h1>
              <div className="flex flex-wrap gap-5">
                <ol className="list-decimal text-sm text-justify">
                  Only those candidates can apply who:
                  {job.whoCanApply.map((item, index) => (
                    <li
                      key={index}
                      className="mb-1 rounded-lg ml-5 text-gray-800 dark:text-gray-400 "
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-lg mt-5 mb-1">
                Number of openings
              </h1>
              <div className="flex flex-wrap gap-5">
                <h1 className="text-sm text-justify">{job.openings}</h1>
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-lg mt-5 mb-1">
                About {job.companyName}
              </h1>
              <div className="flex flex-wrap gap-5">
                <p className="text-sm text-justify text-gray-600 dark:text-gray-400 ">
                  {job.aboutCompany}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              {admin ? (
                <Button className="bg-slate-700 cursor-not-allowed">
                  Admin
                </Button>
              ) : (
                <>
                  {applied ? (
                    <>
                      <Button disabled className="bg-black text-white text-sm">
                        Applied
                      </Button>
                    </>
                  ) : (
                    <>
                      {isSignedIn ? (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className="text-base p-5">Apply now</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              {resume ? (
                                <AlertDialogDescription>
                                  Your latest resume will be shared with the
                                  Admin for your applications.
                                </AlertDialogDescription>
                              ) : (
                                <AlertDialogDescription>
                                  Upload your resume to apply for internships
                                  and jobs.
                                </AlertDialogDescription>
                              )}
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              {resume ? (
                                <>
                                  <AlertDialogCancel onClick={openSideBar}>
                                    Update Resume
                                  </AlertDialogCancel>
                                  <AlertDialogAction onClick={handleApply}>
                                    Continue
                                  </AlertDialogAction>
                                </>
                              ) : (
                                <>
                                  <AlertDialogCancel onClick={openSideBar}>
                                    Upload Resume
                                  </AlertDialogCancel>
                                </>
                              )}
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      ) : (
                        <Button>Sign in</Button>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <img
            src={job.companyLogo}
            className="absolute top-5 right-5"
            width={80}
            alt="Company Logo"
          />
        </div>
      </div>
    </>
  );
};

export default JobDetail;
