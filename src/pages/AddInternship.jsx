import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import QuillEditor from "@/components/QuillEditor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

const AddInternship = () => {
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      console.log(user?.publicMetadata?.role);
    }
    if (user?.publicMetadata?.role !== "admin") {
      toast("Only Admins can access this page");
      navigate("/dashboard");
    }
  }, [isSignedIn, isLoaded, user, navigate]);

  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [stipend, setStipend] = useState("");
  const [openings, setOpenings] = useState("");
  const [duration, setDuration] = useState("");
  const [applyBy, setApplyBy] = useState("");
  const [aboutInternship, setAboutInternship] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");

  const [date, setDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      title,
      companyName,
      location,
      stipend,
      openings,
      duration,
      applyBy,
      aboutInternship,
      aboutCompany,
    });
    setTitle("");
    setCompanyName("");
    setLocation("");
    setStipend("");
    setOpenings("");
    setDuration("");
    setApplyBy("");
  };

  return (
    <>
      <div className="flex p-5 justify-between relative">
        <div className="w-[60vw] rounded">
          <h1 className="text-2xl md:text-4xl font-semibold">
            New Internship Listing
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="py-2 flex gap-10 pt-4">
              <div className="grid max-w-sm items-center gap-1.5 w-[20vw]">
                <Label htmlFor="Internship">Title</Label>
                <Input
                  type="text"
                  id="Internship"
                  placeholder="e.g., Software Engineering Intern"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid max-w-sm items-center gap-1.5 w-[20vw]">
                <Label htmlFor="CompanyName">Company Name</Label>
                <Input
                  type="text"
                  id="CompanyName"
                  placeholder="e.g., Tech Corp"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="grid max-w-sm items-center gap-1.5 relative w-[20vw]">
                <Label htmlFor="Location">Location</Label>
                <Input
                  type="text"
                  id="Location"
                  placeholder="e.g., San Francisco, CA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-8"
                />
                <MapPin size={20} className="absolute left-2 top-7 text-xs " />
              </div>
            </div>
            <div className="py-2 flex gap-10">
              <div className="grid max-w-sm items-center gap-1.5 w-[20vw]">
                <Label htmlFor="start-date">Start date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal w-[18vw]",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid max-w-sm items-center gap-1.5 w-[20vw]">
                <Label htmlFor="CompanyLogo">Company Logo</Label>
                <Input
                  type="file"
                  id="CompanyLogo"
                  onChange={(e) =>
                    console.log("Selected file:", e.target.files[0])
                  }
                />
              </div>
              <div className="grid max-w-sm items-center gap-1.5 relative w-[20vw]">
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
                  className="absolute left-2 top-7 text-xs "
                />
              </div>
            </div>
            <div className="py-2 flex gap-10">
              <div className="grid max-w-sm items-center gap-1.5 w-[20vw]">
                <Label htmlFor="Openings">No of Openings</Label>
                <Input
                  type="number"
                  id="Openings"
                  placeholder="10"
                  value={openings}
                  onChange={(e) => setOpenings(e.target.value)}
                />
              </div>
              <div className="grid max-w-sm items-center gap-1.5 w-[20vw]">
                <Label htmlFor="Duration">Duration</Label>
                <Input
                  type="number"
                  id="Duration"
                  placeholder="e.g., 3 months"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="grid max-w-sm items-center gap-1.5 relative w-[20vw]">
                <Label htmlFor="ApplyBy">Apply by</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal w-[18vw]",
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
            <div className="">
              <div className="">
                <Label htmlFor="aboutInternship">About Internship</Label>
                <ReactQuill
                  className="w-full rounded"
                  value={aboutInternship}
                  onChange={setAboutInternship}
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
              />
            </div>
            <div className="mt-5">
              <Button type="submit" className="py-2 px-4 rounded">
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center h-full">
          <img
            src="/img_temp.jpg"
            alt=""
            className="w-[30vw] h-[85vh] rounded object-cover absolute right-3 top-4"
          />
        </div>
      </div>
    </>
  );
};

export default AddInternship;
