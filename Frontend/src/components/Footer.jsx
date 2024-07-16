// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Footer = () => {
//   const navigate = useNavigate();
//   const [isAdmin, setIsAdmin] = useState(false);
//   const { isSignedIn, user, isLoaded } = useUser();
//   useEffect(() => {
//     if (isLoaded && isSignedIn && user) {
//       setIsAdmin(user.publicMetadata?.role === "admin");
//     }
//   }, [isLoaded, isSignedIn, user]);
//   return (
//     <div>
//       <footer className="bg-slate-100">
//         <div className="relative mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8 lg:pt-10">
//           <div className="lg:flex lg:items-end lg:justify-between">
//             <div>
//               <div className="flex justify-center  lg:justify-start">
//                 <div
//                   className="flex gap-1 items-center cursor-pointer"
//                   onClick={() => navigate("/dashboard")}
//                 >
//                   <img src="/logo.png" alt="logo" className="h-10" />
//                   <h2 className="font-bold text-xl hidden md:block">
//                     CareerQuest
//                   </h2>
//                 </div>
//               </div>

//               <p className="mx-auto mt-1 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
//                 Find your ideal internships and jobs effortlessly
//               </p>
//             </div>

//             <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
//               <li>
//                 <a
//                   className="text-gray-700 transition hover:text-gray-700/75"
//                   href="#"
//                 >
//                   Internships
//                 </a>
//               </li>

//               <li>
//                 <a
//                   className="text-gray-700 transition hover:text-gray-700/75"
//                   href="#"
//                 >
//                   Jobs
//                 </a>
//               </li>

//               <li>
//                 <a
//                   className="text-gray-700 transition hover:text-gray-700/75"
//                   href="#"
//                 >
//                   Applications
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <p className="mt-4 text-center text-sm text-gray-500 lg:text-right">
//             Copyright &copy; 2022. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Footer;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Footer = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setIsAdmin(user.publicMetadata?.role === "admin");
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <div>
      <footer className="bg-slate-100 dark:bg-slate-800 mt-5 z-[1]">
        <div className="relative mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8 lg:pt-10">
          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <div className="flex justify-center lg:justify-start">
                <div
                  className="flex gap-1 items-center cursor-pointer"
                  onClick={() => navigate("/dashboard")}
                >
                  <img src="/logo.png" alt="logo" className="h-10" />
                  <h2 className="font-bold text-xl ">CareerQuest</h2>
                </div>
              </div>

              <p className="mx-auto mt-1 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-300 font-semibold lg:text-left">
                Find your ideal internships and jobs effortlessly
              </p>
            </div>

            <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12 font-semibold ">
              <li>
                <a
                  className="text-gray-700 dark:text-gray-400 transition hover:text-gray-700/75"
                  href="/internships"
                >
                  Internships
                </a>
              </li>

              <li>
                <a
                  className="text-gray-700 transition dark:text-gray-400 hover:text-gray-700/75"
                  href="jobs"
                >
                  Jobs
                </a>
              </li>

              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-400"
                  href={isAdmin ? "/admin-applications" : "/applications"}
                >
                  Applications
                </a>
              </li>
              {/* {isAdmin && (
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75 dark:text-gray-400"
                    href="#"
                  >
                    Admin
                  </a>
                </li>
              )} */}
            </ul>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:text-right">
            Copyright &copy; 2022. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
