import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ModeToggle from "./ModeProvider"; // Adjust the path as per your project structure
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Bell, Ellipsis } from "lucide-react";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Header = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [inputResume, setInputResume] = useState();
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      toast(`Welcome to CareerQuest, ${user.username}`, {
        action: { label: "Undo" },
      });
      console.log("user", user);
    }
  }, [isSignedIn, isLoaded, user]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setIsAdmin(user.publicMetadata?.role === "admin");
    }
  }, [isLoaded, isSignedIn, user]);

  const [resume, setResume] = useState([]);
  const [resumePresent, setResumePresent] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      axios
        .get(`http://localhost:4000/resume-present/${user.id}`)
        .then((res) => {
          setResume(res.data);
          setResumePresent(true);
        })
        .catch((err) => {
          if (err.response?.status === 404) {
            console.log("No resume found");
            setResumePresent(false);
          } else {
            console.error(err);
          }
        });
    }
  }, [isSignedIn, user]);

  const handleSubmitResume = () => {
    if (!inputResume) {
      toast("Please select a file to upload");
      return;
    }

    // const formData = new FormData();
    // formData.append("clerkId", user.id);
    // formData.append("resume", inputResume);
    console.log("resume", inputResume);
    console.log("clerkId", user.id);

    axios
      .post(
        `http://localhost:4000/add-resume`,
        { clerkId: user.id, resume: inputResume },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setResumePresent(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="bg-slate-200 shadow-sm dark:bg-slate-800">
      <div className="md:p-3 md:px-10 flex justify-between items-center p-3">
        <div className="md:flex gap-7 font-semibold items-center text-base">
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <img src="/logo.png" alt="logo" className="md:h-10 h-10" />
            <h2 className="hidden md:font-bold md:text-xl md:block">
              CareerQuest
            </h2>
          </div>
          <h2
            className="hidden md:block cursor-pointer"
            onClick={() => navigate("/internships")}
          >
            Internships
          </h2>
          <h2
            className="hidden md:block cursor-pointer"
            onClick={() => navigate("/jobs")}
          >
            Jobs
          </h2>

          <h2 className="hidden md:block cursor-pointer">Courses</h2>
          <h2
            className="hidden md:block cursor-pointer"
            onClick={() => navigate("/applications")}
          >
            Applications
          </h2>
          {isAdmin && (
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Add</NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col p-3 bg-white dark:bg-slate-500 rounded-md shadow-md">
                    <NavigationMenuLink
                      className="text-center text-sm hover:bg-slate-200 w-[12vw] dark:hover:bg-slate-600 rounded-lg p-2 cursor-pointer"
                      onClick={() => navigate("/add-Internship")}
                    >
                      Internship opening
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      onClick={() => navigate("/add-job")}
                      className="text-center text-sm dark:hover:bg-slate-600 hover:bg-slate-200 rounded-lg p-2 cursor-pointer"
                    >
                      Job opening
                    </NavigationMenuLink>
                    <NavigationMenuLink className="text-center text-sm dark:hover:bg-slate-600 hover:bg-slate-200 rounded-lg p-2 cursor-pointer">
                      Course
                    </NavigationMenuLink>
                    <NavigationMenuLink className="text-center text-sm dark:hover:bg-slate-600 hover:bg-slate-200 rounded-lg p-2 cursor-pointer">
                      Applications
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        <div className="md:hidden">
          <NavigationMenu className="md:hidden ">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Ellipsis />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col p-3 bg-white rounded-md dark:bg-slate-700 shadow-md">
                  <NavigationMenuLink
                    className="text-center text-sm hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg p-2"
                    onClick={() => navigate("/internships")}
                  >
                    Internships
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="text-center text-sm hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg p-2"
                    onClick={() => navigate("/jobs")}
                  >
                    Jobs
                  </NavigationMenuLink>
                  <NavigationMenuLink className="text-center text-sm hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg p-2">
                    Courses
                  </NavigationMenuLink>
                  <NavigationMenuLink className="text-center text-sm hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg p-2">
                    Application
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {isAdmin && (
          <NavigationMenu className="md:hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Add</NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col p-3 bg-white rounded-md dark:bg-slate-700 shadow-md">
                  <NavigationMenuLink
                    onClick={() => navigate("/add-Internship")}
                    className="text-center text-sm hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg p-2 cursor-pointer"
                  >
                    Internship opening
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    onClick={() => navigate("/add-job")}
                    className="text-center text-sm hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg p-2 cursor-pointer"
                  >
                    Job opening
                  </NavigationMenuLink>
                  <NavigationMenuLink className="text-center text-sm hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg p-2 cursor-pointer">
                    Course
                  </NavigationMenuLink>
                  <NavigationMenuLink className="text-center text-sm hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg p-2 cursor-pointer">
                    Applications
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
        {isLoaded && (
          <div className="md:hidden pt-1">
            <ModeToggle />
          </div>
        )}
        {isLoaded ? (
          <div className="hidden md:flex space-x-4 items-center">
            <ModeToggle />
            {isSignedIn ? (
              <SignedIn>
                <UserButton />
              </SignedIn>
            ) : (
              <>
                <Button>
                  <SignedOut>
                    <SignInButton>Candidate Sign-up</SignInButton>
                  </SignedOut>
                </Button>
                <Button>Employer Sign-up</Button>
              </>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Skeleton className="w-20 h-8 rounded" />
            <Skeleton className="hidden md:block w-20 h-8 rounded" />
          </div>
        )}
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        {/* </div> */}
        {isSignedIn ? (
          <div className="md:hidden">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        ) : (
          isLoaded && (
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger className="font-bold text-lg">
                  <Button> Sign-in</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <SignedOut>
                      <SignInButton>Candidate Sign-up</SignInButton>
                    </SignedOut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Employer Sign-up</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Header;
