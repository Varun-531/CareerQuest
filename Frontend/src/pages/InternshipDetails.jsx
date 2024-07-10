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
import { SignedIn, useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

const InternshipDetails = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch-internship/${id}`)
      .then((res) => {
        setInternship(res.data);
        setLoading(false);
        console.log("Fetched internship:", res.data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log("internId", id);
      console.log("clerkId", user.id);
      axios
        .post("http://localhost:4000/check-intern-application", {
          internId: id,
          clerkId: user.id,
        })
        .then((res) => {
          setApplied(res.data.applied);
          console.log("Applied", res.data.applied);
        })
        .catch((err) => {
          console.log(err);
        });

      setAdmin(user.publicMetadata?.role === "admin");
    }
  }, [isLoaded, isSignedIn, user, id]);

  if (error) {
    return <div>Error fetching internship: {error.message}</div>;
  }

  if (!internship) {
    return <div>No internship found</div>;
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
      // console.log("internId", internship._id);
      // console.log("clerkId", user.id);
      setLoading(true);
      axios
        .post("http://localhost:4000/apply-internship", {
          internId: internship._id,
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
                href="/internships"
              >
                Internships
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                {internship.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="p-10 px-20">
        <h1 className="text-center font-semibold text-4xl">
          {internship.title} Internship
        </h1>
        <div className="relative border-[1px] border-slate-300 mt-10 p-5 rounded-lg">
          <div>
            <h1 className="font-semibold text-lg ">{internship.title}</h1>
            <h1 className="font-semibold text-gray-400 ">
              {internship.companyName}
            </h1>
            <h1 className="mt-4 items-center flex font-semibold text-gray-600 text-sm gap-1">
              <MapPin strokeWidth={2} size={20} />
              {internship.location}
            </h1>
            <div className="mt-4 flex gap-[6vw]">
              <div className="flex flex-col items-baseline">
                <h2 className="flex gap-1 text-sm items-center font-semibold text-gray-400">
                  <Play strokeWidth={2} size={15} />
                  Start Date
                </h2>
                <p className="text-gray-600 text-sm font-semibold">
                  {formatDate(internship.startDate)}
                </p>
              </div>
              <div className="flex flex-col items-baseline">
                <h2 className="flex gap-1 text-sm items-center font-semibold text-gray-400">
                  <Calendar strokeWidth={2} size={15} />
                  Duration
                </h2>
                <p className="text-gray-600 text-sm font-semibold">
                  {internship.duration} Months
                </p>
              </div>
              <div className="flex flex-col items-baseline">
                <h2 className="flex gap-1 text-sm items-center font-semibold text-gray-400">
                  <Banknote strokeWidth={2} size={15} />
                  Stipend
                </h2>
                <p className="text-gray-600 text-sm font-semibold">
                  {formatSalary(internship.stipend)} Rupees
                </p>
              </div>
              <div className="flex flex-col items-baseline">
                <h2 className="flex gap-1 text-sm items-center font-semibold text-gray-400">
                  <Hourglass strokeWidth={2} size={15} />
                  Apply By
                </h2>
                <p className="text-gray-600 text-sm font-semibold">
                  {formatDate(internship.applyBy)}
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-center mt-3">
              <h2 className="mt-3 flex items-center gap-1 text-xs font-semibold bg-slate-200 text-gray-500 w-fit p-1 py-1 rounded">
                <History className="" size={15} strokeWidth={2} /> Posted{" "}
                {format(internship.createdAt)}
              </h2>
              {internship.job && (
                <h2 className="text-xs flex items-center font-semibold mt-3 bg-slate-200 p-1 rounded text-gray-500">
                  Internship with job offer
                </h2>
              )}
            </div>
            <div className="my-3">
              <h1 className="flex gap-2 items-center text-sm">
                <Users2Icon strokeWidth={1} size={20} />
                {internship.appliedPeople.length} applications
              </h1>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-lg ">About Internship</h1>
              <p className="text-gray-600 text-sm text-justify">
                {internship.aboutInternship}
              </p>
            </div>
            <div>
              <h1 className="font-semibold text-lg mt-5 mb-1">Perks</h1>
              <div className="flex flex-wrap gap-5">
                {internship.perks.map((perk, index) => (
                  <h1
                    key={index}
                    className="bg-slate-200 w-fit p-1 m-1 rounded-lg font-semibold text-sm text-gray-700"
                    text={perk}
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
                  {internship.whoCanApply.map((perk, index) => (
                    <li
                      key={index}
                      className="mb-1 rounded-lg ml-5 text-gray-800"
                    >
                      {perk}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-lg mt-5 mb-1">
                No of openings
              </h1>
              <div className="flex flex-wrap gap-5">
                <h1 className="text-sm text-justify">{internship.openings}</h1>
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-lg mt-5 mb-1">
                About {internship.companyName}
              </h1>
              <div className="flex flex-wrap gap-5">
                <p className="text-sm text-justify text-gray-600">
                  {internship.aboutCompany}
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
                      <Button className="bg-slate-700 cursor-not-allowed">
                        Applied
                      </Button>
                    </>
                  ) : (
                    <Button className="text-base p-5" onClick={handleApply}>
                      Apply now
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
          <img
            src={internship.companyLogo}
            className="absolute top-5 right-5"
            width={80}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default InternshipDetails;
