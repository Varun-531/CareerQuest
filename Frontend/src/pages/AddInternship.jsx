import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCookies } from "react-cookie";
import { format } from "date-fns";
import { BanknoteIcon, CalendarIcon, MapPin } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import { HashLoader } from "react-spinners";
import { Checkbox } from "@/components/ui/checkbox";

const AddInternship = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      // console.log("token", cookies.jwt);
      console.log(user?.publicMetadata?.role);
    }
    if (user?.publicMetadata?.role !== "admin") {
      toast("Only Admins can access this page");
      navigate("/dashboard");
    }
  }, [isSignedIn, isLoaded, user, navigate]);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [stipend, setStipend] = useState("");
  const [openings, setOpenings] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [duration, setDuration] = useState("");
  const [applyBy, setApplyBy] = useState("");
  const [aboutInternship, setAboutInternship] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [perks, setPerks] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [whoCanApply, setWhoCanApply] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [job, setJob] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("companyName", companyName);
    formData.append("location", location);
    formData.append("stipend", stipend);
    formData.append("companyLogo", companyLogo);
    formData.append("openings", openings);
    formData.append("duration", duration);
    formData.append("startDate", startDate);
    formData.append("job", job);
    formData.append("applyBy", applyBy);
    formData.append("aboutInternship", aboutInternship);
    formData.append("aboutCompany", aboutCompany);
    formData.append("perks", perks);
    formData.append("skillsRequired", skillsRequired);
    formData.append("whoCanApply", whoCanApply);

    try {
      const response = await axios.post(
        "http://localhost:4000/add-Internship",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );
      setLoading(false);
      console.log("Form submitted:", response.data);
      toast("Internship added successfully!");
      // Clear the form fields after successful submission
      setTitle("");
      setCompanyName("");
      setLocation("");
      setJob(false);
      setStipend("");
      setStartDate(null);
      setCompanyLogo(null);
      setOpenings("");
      setDuration("");
      setApplyBy("");
      setAboutInternship("");
      setCompanyLogo(null);
      setAboutCompany("");
      setPerks("");
      setSkillsRequired("");
      setWhoCanApply("");
    } catch (error) {
      setLoading(false);
      console.error("There was an error adding the internship:", error);
      toast("Failed to add internship.");
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
      <div className="px-5 md:px-10 md:py-0 py-5">
        <div className="md:flex md:p-5 md:justify-between md:relative">
          <div className="md:w-[60vw] rounded">
            <h1 className="text-2xl md:text-4xl font-semibold">
              New Internship Listing
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="py-4 flex flex-col md:flex-row md:flex gap-5 md:gap-10 pt-4">
                <div className="grid max-w-sm items-center gap-1.5  md:w-[17vw]">
                  <Label htmlFor="Internship">Title</Label>
                  <Input
                    type="text"
                    id="Internship"
                    placeholder="e.g., Software Engineering Intern"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid max-w-sm items-center gap-1.5 md:w-[17vw]">
                  <Label htmlFor="CompanyName">Company Name</Label>
                  <Input
                    type="text"
                    id="CompanyName"
                    placeholder="e.g., Tech Corp"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="grid max-w-sm items-center gap-1.5 relative md:w-[17vw]">
                  <Label htmlFor="Location">Location</Label>
                  <Input
                    type="text"
                    id="Location"
                    placeholder="e.g., San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-8"
                  />
                  <MapPin
                    size={20}
                    className="absolute left-2 top-7 text-xs text-gray-500"
                  />
                </div>
              </div>
              <div className="py-4 flex md:flex-row flex-col gap-5 md:gap-10">
                <div className="grid max-w-sm items-center gap-1.5 md:w-[17vw]">
                  <Label htmlFor="start-date">Start date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal md:w-[17vw]",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid max-w-sm items-center gap-1.5 md:w-[17vw]">
                  <Label htmlFor="CompanyLogo">Company Logo</Label>
                  <Input
                    type="file"
                    id="CompanyLogo"
                    onChange={(e) => {
                      setCompanyLogo(e.target.files[0]);
                      console.log("Selected file:", e.target.files[0]);
                    }}
                  />
                </div>
                <div className="grid max-w-sm items-center gap-1.5 relative md:w-[17vw]">
                  <Label htmlFor="Stipend">Stipend</Label>
                  <Input
                    type="number"
                    id="Stipend"
                    placeholder="In Rupees"
                    value={stipend}
                    onChange={(e) => setStipend(e.target.value)}
                    className="pl-8"
                  />
                  <BanknoteIcon
                    size={20}
                    className="absolute left-2 top-7 text-xs text-gray-500"
                  />
                </div>
              </div>
              <div className="py-4 flex md:flex-row flex-col gap-5 md:gap-10">
                <div className="grid max-w-sm items-center gap-1.5 md:w-[17vw]">
                  <Label htmlFor="Openings">No of Openings</Label>
                  <Input
                    type="number"
                    id="Openings"
                    placeholder="eg., 10"
                    value={openings}
                    onChange={(e) => setOpenings(e.target.value)}
                  />
                </div>
                <div className="grid max-w-sm items-center gap-1.5 md:w-[17vw]">
                  <Label htmlFor="Duration">Duration</Label>
                  <Input
                    type="number"
                    id="Duration"
                    placeholder="e.g., 3 months"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div className="grid max-w-sm items-center gap-1.5 relative md:w-[17vw]">
                  <Label htmlFor="ApplyBy">Apply by</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal md:w-[17vw]",
                          !applyBy && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {applyBy ? (
                          format(applyBy, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={applyBy}
                        onSelect={setApplyBy}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms2"
                  checked={job}
                  onClick={() => {
                    setJob(!job);
                    console.log("Job:", !job);
                  }}
                />

                <label
                  htmlFor="terms2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Internship with Job Offer
                </label>
              </div>
              <div>
                <div className="py-4">
                  <Label htmlFor="aboutInternship">About Internship</Label>
                  {/* <ReactQuill
                    className="w-full rounded md:pr-5"
                    value={aboutInternship}
                    onChange={setAboutInternship}
                  /> */}
                  <Textarea
                    placeholder="Each perk on a new line"
                    id="perks"
                    value={aboutInternship}
                    onChange={(e) => setAboutInternship(e.target.value)}
                    className="min-h-20 md:w-[58vw]"
                  />
                </div>
              </div>
              <div>
                <div className="py-4">
                  <Label htmlFor="perks">Perks</Label>
                  <Textarea
                    placeholder="Each perk on a new line"
                    id="perks"
                    value={perks}
                    onChange={(e) => setPerks(e.target.value)}
                    className="min-h-20 md:w-[58vw]"
                  />
                </div>
              </div>
              <div>
                <div className="py-4">
                  <Label htmlFor="skillsRequired">Skills Required</Label>
                  <Textarea
                    placeholder="Each Skill on a new line"
                    id="skillsRequired"
                    value={skillsRequired}
                    onChange={(e) => setSkillsRequired(e.target.value)}
                    className="min-h-20 md:w-[58vw]"
                  />
                </div>
              </div>
              <div>
                <div className="py-4">
                  <Label htmlFor="whoCanApply">Who can Apply</Label>
                  <Textarea
                    placeholder="Each on a new line"
                    id="whoCanApply"
                    value={whoCanApply}
                    onChange={(e) => setWhoCanApply(e.target.value)}
                    className="min-h-20 md:w-[58vw]"
                  />
                </div>
              </div>
              <div className="mt-5">
                <Label htmlFor="aboutCompany">About {companyName}</Label>
                <Textarea
                  placeholder="Enter few lines about the company"
                  id="aboutCompany"
                  value={aboutCompany}
                  onChange={(e) => setAboutCompany(e.target.value)}
                  className="min-h-40 md:w-[58vw]"
                />
              </div>
              <div className="flex md:justify-end justify-center mr-5 mt-5">
                <Button type="submit sm:w-full">Submit</Button>
              </div>
            </form>
          </div>
          <div className="hidden md:block md:w-[30vw] md:sticky md:top-10 mt-5 md:mt-0 bg-slate-50 h-[40vh] rounded">
            <img
              src="/img_temp.jpg"
              alt=""
              className="w-[30vw] h-[85vh] rounded object-cover sticky top-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddInternship;
