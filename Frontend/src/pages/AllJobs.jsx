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
import { HashLoader } from "react-spinners";
import JobSlimCard from "../components/jobSlimCard";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [fresherJob, setFresherJob] = useState(false);
  const [salary, setSalary] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/all-jobs")
      .then((res) => {
        console.log("Fetched jobs:", res.data);
        setJobs(res.data);
        setFilteredJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterJobs();
  }, [title, location, fresherJob, salary]);

  const filterJobs = () => {
    let filtered = jobs;

    if (title) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (fresherJob) {
      filtered = filtered.filter((job) => job.fresherJob === true);
    }

    if (salary > 0) {
      filtered = filtered.filter((job) => job.salary >= salary * 100000);
    }

    setFilteredJobs(filtered);
  };

  const clearFilters = () => {
    setTitle("");
    setLocation("");
    setFresherJob(false);
    setSalary(0);
    setFilteredJobs(jobs);
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
                Jobs
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="p-5 pt-0">
        <h2 className="text-center font-semibold text-2xl">
          {filteredJobs.length} jobs available
        </h2>
        <div className="md:flex gap-3 justify-center p-4">
          <div className="md:w-[25vw] shadow-lg dark:bg-gray-900 rounded-sm p-5 flex flex-col gap-2 h-fit md:sticky md:top-10">
            <h1 className="text-center font-semibold text-xl capitalize flex items-center justify-center gap-1">
              <Filter size={22} className="text-slate-400" /> filters
            </h1>
            <div className="flex flex-col gap-1">
              <Label htmlFor="JobTitle" className="font-semibold">
                Title
              </Label>
              <Input
                type="text"
                id="JobTitle"
                placeholder="e.g., Software Engineering Intern"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="JobLocation" className="font-semibold">
                Location
              </Label>
              <Input
                type="text"
                id="JobLocation"
                placeholder="e.g., Bangalore"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center mt-1">
              <Checkbox
                id="fresherJob"
                checked={fresherJob}
                onChange={(e) => setFresherJob(e.target.checked)}
                onClick={() => setFresherJob(!fresherJob)}
              />
              <Label
                htmlFor="fresherJob"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Fresher Job
              </Label>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex justify-between">
                <Label htmlFor="Salary" className="font-semibold">
                  Salary (in Lakhs)
                </Label>
                <h1 className="font-semibold">{salary} L</h1>
              </div>
              <Slider
                defaultValue={[0]}
                value={[salary]}
                onValueChange={(newValue) => setSalary(newValue[0])}
                className="md:w-[20vw] bg-slate-40 rounded-sm"
                max={20}
                min={0}
                step={0.5}
              />
            </div>
            <Button variant="ghost" className="mt-2" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
          <div className="md:w-[40vw] mt-5 md:mt-0 rounded-sm">
            {filteredJobs.map((job, index) => (
              <JobSlimCard key={index} props={job} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllJobs;
