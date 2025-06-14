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

const SideBar = () => {
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();
  const [resume, setResume] = useState(null);
  const [isResumePresent, setIsResumePresent] = useState(false);
  const [existingResume, setExistingResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkResume = async () => {
    if (isSignedIn && isLoaded && user?.id) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/resume-present/${user.id}`
        );
        if (res.status === 200) {
          setIsResumePresent(true);
          setExistingResume(res.data.resume);
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
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/add-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
    if (isResumePresent) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const link = document.createElement("a");
        link.href = existingResume;
        link.download = "resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(existingResume, "_blank");
      }
    } else {
      console.error("No resume available to view.");
    }
  };

  return (
    <div>
      {!isSignedIn ? (
        <div className="flex items-center justify-center h-full">
          <p>Please sign in to view and upload your resume.</p>
        </div>
      ) : (
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" id="resume">
                Resume
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Resume</SheetTitle>
                <SheetDescription>
                  {isResumePresent ? (
                    <>
                      Your resume will be shared with the Admin for your
                      applications.
                    </>
                  ) : (
                    <>Upload your resume to apply for internships and jobs.</>
                  )}
                </SheetDescription>
              </SheetHeader>
              <div>
                {isResumePresent && existingResume ? (
                  <div>
                    <p className="font-semibold flex flex-col gap-2 mt-2">
                      Existing Resume:{" "}
                      {existingResume.endsWith(".pdf") ? (
                        <>
                          {" "}
                          <div className="hidden md:block relative">
                            <div className="h-[202px] w-[143px] hover:bg-slate-800 absolute top-0 opacity-30 flex items-center justify-center">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Eye
                                      className="text-white text-4xl cursor-pointer"
                                      onClick={handleViewResume}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="font-semibold">View</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <embed
                              src={existingResume}
                              className="h-[202px] w-[143px] cursor-pointer"
                              style={{ overflow: "hidden", border: "none" }}
                            />
                          </div>
                          <div className="md:hidden">
                            <Button variant="ghost" onClick={handleViewResume}>
                              View Resume
                            </Button>
                          </div>
                        </>
                      ) : (
                        <img
                          src={existingResume}
                          alt="Resume Preview"
                          className="w-16 h-auto inline-block mr-2"
                        />
                      )}
                    </p>
                    <div className="space-y-2 mt-3">
                      {" "}
                      <Label>Update Resume</Label>
                      <Input
                        type="file"
                        onChange={(e) => setResume(e.target.files[0])}
                      />
                      <Button type="submit" onClick={handleResumeSubmit}>
                        Upload
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleResumeSubmit} className="space-y-2">
                    <Label>Resume</Label>
                    <Input
                      type="file"
                      onChange={(e) => setResume(e.target.files[0])}
                    />
                    <Button type="submit">Upload</Button>
                  </form>
                )}
              </div>
              <SheetFooter>
                <SheetClose asChild />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  );
};

export default SideBar;
