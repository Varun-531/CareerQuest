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
import { Bell, Ellipsis, Menu } from "lucide-react";
import axios from "axios";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header2 = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setIsAdmin(user.publicMetadata?.role === "admin");
    }
  }, [isLoaded, isSignedIn, user]);
  return (
    <div className="bg-slate-200 shadow-sm dark:bg-slate-800">
      <div className="p-3 flex justify-between items-center">
        <div className="flex items-center gap-7 font-semibold">
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <img src="/logo.png" alt="logo" className="h-10" />
            <h2 className="font-bold text-xl hidden md:block">CareerQuest</h2>
          </div>
          <h2
            className="cursor-pointer hidden md:block"
            onClick={() => navigate("/internships")}
          >
            Internships
          </h2>
          <h2
            className="cursor-pointer hidden md:block"
            onClick={() => navigate("/jobs")}
          >
            Jobs
          </h2>
          <h2
            className="hidden md:block cursor-pointer"
            onClick={() =>
              isAdmin
                ? navigate("/admin-applications")
                : navigate("/applications")
            }
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
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        <div className="md:flex items-center gap-3 hidden">
          <ModeToggle />
          {isLoaded ? (
            <div className="p-1 ">
              {isSignedIn ? (
                <>
                  <SignedIn>
                    <UserButton className="" showName={true} />
                  </SignedIn>
                </>
              ) : (
                <>
                  <Button>
                    <SignedOut>
                      <SignInButton mode="modal">Sign-up/Sign-in</SignInButton>
                    </SignedOut>
                  </Button>
                  {/* <Button>Employer Sign-up</Button> */}
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Skeleton className="w-20 h-8 rounded" />
              <Skeleton className="hidden md:block w-20 h-8 rounded" />
            </div>
          )}
        </div>
        <div className="md:hidden">
          <div className="flex items-center gap-2">
            {isSignedIn ? (
              <SignedIn>
                <UserButton className="" showName={false} />
              </SignedIn>
            ) : (
              <>
                <Button>
                  <SignedOut>
                    <SignInButton mode="modal">Sign-in</SignInButton>
                  </SignedOut>
                </Button>
              </>
            )}
            <ModeToggle />
            <Sheet>
              <SheetTrigger>
                <Menu size={30} strokeWidth={2} />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
                  {/* <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription> */}
                  <div className="flex justify-center mt-10">
                    {isSignedIn ? (
                      <SignedIn>
                        <UserButton className="" showName={true} />
                      </SignedIn>
                    ) : (
                      <>
                        <Button>
                          <SignedOut>
                            <SignInButton mode="modal">
                              Sign-up/Sign-in
                            </SignInButton>
                          </SignedOut>
                        </Button>
                        {/* <Button>Employer Sign-up</Button> */}
                      </>
                    )}
                  </div>
                  <SheetClose asChild>
                    <Button
                      className=""
                      variant="ghost"
                      onClick={() => navigate("/internships")}
                    >
                      Internships
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className=""
                      variant="ghost"
                      onClick={() => navigate("/jobs")}
                    >
                      Jobs
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className=""
                      variant="ghost"
                      onClick={() =>
                        isAdmin
                          ? navigate("/admin-applications")
                          : navigate("/applications")
                      }
                    >
                      Applications
                    </Button>
                  </SheetClose>
                  {isAdmin && (
                    <>
                      <SheetClose asChild>
                        <Button
                          className=""
                          variant="ghost"
                          onClick={() => navigate("/add-Internship")}
                        >
                          Add Internship
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          className=""
                          variant="ghost"
                          onClick={() => navigate("/add-job")}
                        >
                          Add Job
                        </Button>
                      </SheetClose>
                    </>
                  )}
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;
