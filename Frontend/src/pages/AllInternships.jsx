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
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { set } from "date-fns";

const AllInternships = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [withJobOffer, setWithJobOffer] = useState(false);
  const [stipend, setStipend] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/all-internships")
      .then((res) => {
        console.log("Fetched internships:", res.data);
        setInternships(res.data);
        setFilteredInternships(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching internships:", err);
        setError("Failed to fetch internships. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterInternships();
  }, [title, location, withJobOffer, stipend]);

  const filterInternships = () => {
    let filtered = internships;

    if (title) {
      filtered = filtered.filter((internship) =>
        internship.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((internship) =>
        internship.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (withJobOffer) {
      filtered = filtered.filter((internship) => internship.job === true);
    }

    if (stipend > 0) {
      filtered = filtered.filter((internship) => internship.stipend >= stipend);
    }

    setFilteredInternships(filtered);
  };

  const clearFilters = () => {
    setTitle("");
    setLocation("");
    setWithJobOffer(false);
    setStipend(0);
    setFilteredInternships(internships);
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
                className="font-semibold cursor-pointer"
                href="/dashboard"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold cursor-pointer">
                Internships
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="p-5 pt-0">
        <h2 className="text-center font-semibold text-2xl">
          {filteredInternships.length} internships available
        </h2>
        <div className="md:flex gap-3 justify-center p-4">
          <div className="md:w-[25vw] shadow-lg dark:bg-gray-900 rounded-sm p-5 flex flex-col gap-2 h-fit md:sticky md:top-10">
            <h1 className="text-center font-semibold text-xl capitalize flex items-center justify-center gap-1">
              <Filter size={22} className="text-slate-400" /> filters
            </h1>
            <div className="flex flex-col gap-1">
              <Label htmlFor="InternshipTitle" className="font-semibold">
                Title
              </Label>
              <Input
                type="text"
                id="InternshipTitle"
                placeholder="e.g., Software Engineering Intern"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="InternshipLocation" className="font-semibold">
                Location
              </Label>
              <Input
                type="text"
                id="InternshipLocation"
                placeholder="e.g., Bangalore"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center mt-1">
              <Checkbox
                id="withJobOffer"
                checked={withJobOffer}
                // onChange={(e) => setWithJobOffer(e.target.checked)}
                onClick={() => setWithJobOffer(!withJobOffer)}
              />
              <Label
                htmlFor="withJobOffer"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Internship with Job Offer
              </Label>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex justify-between">
                <Label htmlFor="Stipend" className="font-semibold">
                  Stipend
                </Label>
                <h1 className="font-semibold">{stipend}</h1>
              </div>
              <Slider
                defaultValue={[0]}
                value={[stipend]}
                onValueChange={(newValue) => setStipend(newValue[0])}
                className="md:w-[20vw] bg-slate-40 rounded-sm"
                max={30000}
                min={0}
                step={5000}
              />
            </div>
            <Button variant="ghost" className="mt-2" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
          <div className="md:w-[40vw] rounded-sm md:mt-0 mt-10">
            {filteredInternships.map((internship) => (
              <InternSlimCard key={internship.id} props={internship} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllInternships;
