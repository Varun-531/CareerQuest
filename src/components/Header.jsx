import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { toast } from "sonner";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const Header = () => {
  // const [isAdmin, setIsAdmin] = useState(false);
  // const { isSignedIn, user, isLoaded } = useUser();

  // useEffect(() => {
  //   if (isSignedIn && isLoaded) {
  //     toast(`Welcome to CareerQuest, ${user.username}`, {
  //       action: { label: "Undo" },
  //     });
  //   }
  // }, [isSignedIn, isLoaded, user]);
  // useEffect(() => {
  //   console.log("user", user?.publicMetadata);
  //   if (isLoaded && user?.publicMetadata?.role === "admin") {
  //     setIsAdmin(true);
  //   }
  //   console.log("isAdmin", isAdmin);
  // }, [user]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      toast(`Welcome to CareerQuest, ${user.username}`, {
        action: { label: "Undo" },
      });
    }
  }, [isSignedIn, isLoaded, user]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log("user", user.publicMetadata);
      if (user.publicMetadata?.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      console.log("isAdmin", isAdmin);
    }
  }, [isLoaded, isSignedIn, user]);
  return (
    <div className="bg-slate-200 shadow-sm">
      <div className="md:p-3 md:px-10 flex justify-between items-center p-3">
        <div className=" md:flex gap-7 font-semibold items-center text-base">
          <div className="flex gap-1 items-center">
            <img src="/logo.png" alt="logo" className="md:h-10 h-10" />
            <h2 className="hidden md:font-bold md:text-xl md:block">
              CareerQuest
            </h2>
            <h2 className="font-bold text-xl md:hidden">CQ</h2>
          </div>
          <h2 className="hidden md:block cursor-pointer">Internships</h2>
          <h2 className="hidden md:block cursor-pointer">Jobs</h2>
          <h2 className="hidden md:block cursor-pointer">Courses</h2>
          {/* {isAdmin && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Add</NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col gap-4 justify-center p-2 w-fit">
                    <NavigationMenuLink
                      // className={navigationMenuTriggerStyle()}
                      className="flex justify-center hover:bg-slate-100 p-2 rounded"
                    >
                      Internship opening
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      // className={navigationMenuTriggerStyle()}
                      className="flex justify-center hover:bg-slate-100 p-2 rounded"
                    >
                      Job opening
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      // className={navigationMenuTriggerStyle()}
                      className="flex justify-center hover:bg-slate-100 p-2 rounded"
                    >
                      Course
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )} */}
          {isAdmin && (
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Add</NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col p-3 bg-white rounded-md shadow-md">
                    <NavigationMenuLink className="text-center text-sm hover:bg-slate-200 rounded-lg p-2">
                      Internship opening
                    </NavigationMenuLink>
                    <NavigationMenuLink className="text-center text-sm hover:bg-slate-200 rounded-lg p-2">
                      Job opening
                    </NavigationMenuLink>
                    <NavigationMenuLink className="text-center text-sm hover:bg-slate-200 rounded-lg p-2">
                      Course
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="font-bold text-lg">
              <h3 className="flex gap-1 items-center p-0 m-0">
                Filter
                <ChevronDownIcon />
              </h3>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Internship</DropdownMenuItem>
              <DropdownMenuItem>Jobs</DropdownMenuItem>
              <DropdownMenuItem>Courses</DropdownMenuItem>
              {isAdmin && <DropdownMenuItem>Add</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isLoaded ? (
          <>
            <div className="hidden md:block space-x-2">
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
          </>
        ) : (
          <div className="flex gap-2">
            <Skeleton className="w-20 h-8 rounded" />
            <Skeleton className="hidden md:block w-20 h-8 rounded" />
          </div>
        )}
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
