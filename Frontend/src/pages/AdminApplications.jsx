// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";
// import { Check, Filter, X } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

// const AdminApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [internshipData, setInternshipData] = useState({});
//   const [jobData, setJobData] = useState({});
//   const [userData, setUserData] = useState({});

//   const [filters, setFilters] = useState({
//     title: "",
//     username: "",
//     companyName: "",
//     status: "",
//     type: "",
//   });

//   useEffect(() => {
//     const fetchUserData = async (clerkId) => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/fetch-user/${clerkId}`
//         );
//         return response.data;
//       } catch (error) {
//         console.error(`Error fetching user ${clerkId}:`, error);
//         return null;
//       }
//     };

//     const fetchApplicationData = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:4000/fetch-all-applications"
//         );
//         setApplications(res.data);

//         // Fetch data for internships
//         const internshipPromises = res.data.flatMap((application) =>
//           application.internships.map((internship) =>
//             axios.get(
//               `http://localhost:4000/fetch-internship/${internship.internId}`
//             )
//           )
//         );
//         const internshipResponses = await Promise.all(internshipPromises);
//         const internshipData = {};
//         internshipResponses.forEach((response) => {
//           internshipData[response.data._id] = {
//             title: response.data.title,
//             company: response.data.companyName,
//             appliedPeople: response.data.appliedPeople,
//           };
//         });
//         setInternshipData(internshipData);

//         // Fetch data for jobs
//         const jobPromises = res.data.flatMap((application) =>
//           application.jobs.map((job) =>
//             axios.get(`http://localhost:4000/fetch-job/${job.jobId}`)
//           )
//         );
//         const jobResponses = await Promise.all(jobPromises);
//         const jobData = {};
//         jobResponses.forEach((response) => {
//           jobData[response.data._id] = {
//             title: response.data.title,
//             company: response.data.companyName,
//             appliedPeople: response.data.appliedPeople,
//           };
//         });
//         setJobData(jobData);

//         // Fetch usernames, emails, and imageUrls for applied users
//         const allClerkIds = res.data.map((application) => application.clerkId);
//         const uniqueClerkIds = [...new Set(allClerkIds)];
//         const userPromises = uniqueClerkIds.map((clerkId) =>
//           fetchUserData(clerkId)
//         );
//         const userResponses = await Promise.all(userPromises);
//         const userData = {};
//         userResponses.forEach((user) => {
//           if (user) {
//             userData[user.id] = {
//               username: user.username,
//               imageUrl: user.image_url,
//               email: user.email_addresses[0].email_address,
//             };
//           }
//         });
//         setUserData(userData);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchApplicationData();
//   }, []);

//   const handleFilterChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleClearFilters = () => {
//     setFilters({
//       title: "",
//       username: "",
//       companyName: "",
//       status: "",
//       type: "",
//     });
//   };

//   const filteredApplications = applications
//     .map((application) => {
//       const filteredInternships = application.internships.filter(
//         (internship) => {
//           const internshipDataItem = internshipData[internship.internId] || {};

//           return (
//             (!filters.title ||
//               internshipDataItem.title
//                 ?.toLowerCase()
//                 .includes(filters.title.toLowerCase())) &&
//             (!filters.username ||
//               userData[application.clerkId]?.username
//                 ?.toLowerCase()
//                 .includes(filters.username.toLowerCase())) &&
//             (!filters.companyName ||
//               internshipDataItem.company
//                 ?.toLowerCase()
//                 .includes(filters.companyName.toLowerCase())) &&
//             (!filters.status || internship.status === filters.status) &&
//             (!filters.type || filters.type === "Internship")
//           );
//         }
//       );

//       const filteredJobs = application.jobs.filter((job) => {
//         const jobDataItem = jobData[job.jobId] || {};

//         return (
//           (!filters.title ||
//             jobDataItem.title
//               ?.toLowerCase()
//               .includes(filters.title.toLowerCase())) &&
//           (!filters.username ||
//             userData[application.clerkId]?.username
//               ?.toLowerCase()
//               .includes(filters.username.toLowerCase())) &&
//           (!filters.companyName ||
//             jobDataItem.company
//               ?.toLowerCase()
//               .includes(filters.companyName.toLowerCase())) &&
//           (!filters.status || job.status === filters.status) &&
//           (!filters.type || filters.type === "Job")
//         );
//       });

//       return {
//         ...application,
//         internships: filteredInternships,
//         jobs: filteredJobs,
//       };
//     })
//     .filter(
//       (application) =>
//         application.internships.length > 0 || application.jobs.length > 0
//     );

//   return (
//     <>
//       <div className="p-7 flex justify-between">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink
//                 className="font-semibold cursor-pointer"
//                 href="/dashboard"
//               >
//                 Home
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage className="font-semibold cursor-pointer">
//                 Applications
//               </BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div>
//       <div className="px-10">
//         <h1 className="font-semibold text-3xl my-1">All Applications</h1>
//         <div>
//           <div className="flex px-[15vw] gap-4">
//             <div className="w-[25vw] shadow-lg dark:bg-slate-800 rounded-sm p-5 flex flex-col gap-2 h-fit sticky top-5">
//               <h1 className="text-center font-semibold text-xl capitalize flex items-center justify-center gap-1">
//                 <Filter size={22} className="text-slate-400" /> filters
//               </h1>
//               <div className="space-y-2">
//                 <Label>Title</Label>
//                 <Input
//                   type="text"
//                   name="title"
//                   value={filters.title}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Username</Label>
//                 <Input
//                   type="text"
//                   name="username"
//                   value={filters.username}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Company name</Label>
//                 <Input
//                   type="text"
//                   name="companyName"
//                   value={filters.companyName}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Select
//                   name="status"
//                   value={filters.status}
//                   onValueChange={(value) =>
//                     setFilters((prev) => ({ ...prev, status: value }))
//                   }
//                 >
//                   <SelectTrigger className="">
//                     <SelectValue placeholder="Status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Pending">Pending</SelectItem>
//                     <SelectItem value="Accepted">Accepted</SelectItem>
//                     <SelectItem value="Declined">Declined</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Select
//                   name="type"
//                   value={filters.type}
//                   onValueChange={(value) =>
//                     setFilters((prev) => ({ ...prev, type: value }))
//                   }
//                 >
//                   <SelectTrigger className="">
//                     <SelectValue placeholder="Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Internship">Internship</SelectItem>
//                     <SelectItem value="Job">Job</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <Button
//                 variant="ghost"
//                 className="mt-2"
//                 onClick={handleClearFilters}
//               >
//                 Clear All
//               </Button>
//             </div>
//             <div>
//               {filteredApplications.map((application, index) => (
//                 <div key={index} className="mb-4 p-4 shadow-lg rounded-md">
//                   <h2 className="font-semibold text-lg mb-2">
//                     Application {index + 1}
//                   </h2>
//                   <div className="flex justify-between">
//                     <div>
//                       <p>
//                         Applicant:{" "}
//                         {userData[application.clerkId]?.username ||
//                           "Fetching..."}
//                       </p>
//                       <p>
//                         Email:{" "}
//                         {userData[application.clerkId]?.email || "Fetching..."}
//                       </p>
//                       <p className="font-semibold text-sky-500 cursor-pointer">
//                         Resume
//                       </p>
//                     </div>
//                     <div>
//                       {userData[application.clerkId]?.imageUrl && (
//                         <div className="">
//                           <Avatar>
//                             <AvatarImage
//                               src={userData[application.clerkId]?.imageUrl}
//                             />
//                             <AvatarFallback>User</AvatarFallback>
//                           </Avatar>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   {application.internships.length > 0 && (
//                     <div className="mt-4">
//                       <h3 className="font-semibold">Internships:</h3>
//                       {application.internships.map((internship, idx) => (
//                         <div
//                           key={idx}
//                           className="p-4 mb-4 border rounded shadow flex items-center justify-between"
//                         >
//                           <div>
//                             <p>Intern ID: {internship.internId}</p>
//                             <p>
//                               Title:{" "}
//                               {internshipData[internship.internId]?.title}
//                             </p>
//                             <p>
//                               Company:{" "}
//                               {internshipData[internship.internId]?.company}
//                             </p>
//                             <p>Status: {internship.status}</p>
//                           </div>
//                           <div className="flex gap-2">
//                             <Button className="p-2" variant="outline">
//                               <Check size={20} className="text-green-400" />
//                             </Button>
//                             <Button className="p-2" variant="outline">
//                               <X size={20} className="text-red-400" />
//                             </Button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   {application.jobs.length > 0 && (
//                     <div className="mt-4">
//                       <h3 className="font-semibold">Jobs:</h3>
//                       {application.jobs.map((job, idx) => (
//                         <div
//                           key={idx}
//                           className="p-4 mb-4 border rounded shadow flex items-center justify-between"
//                         >
//                           <div>
//                             <p>Job ID: {job.jobId}</p>
//                             <p>Title: {jobData[job.jobId]?.title}</p>
//                             <p>Company: {jobData[job.jobId]?.company}</p>
//                             <p>Status: {job.status}</p>
//                             <p>
//                               Applied People:{" "}
//                               {jobData[job.jobId]?.appliedPeople
//                                 .map((clerkId) => userData[clerkId]?.username)
//                                 .filter((username) => username)
//                                 .join(", ")}
//                             </p>
//                           </div>
//                           <div className="flex gap-2">
//                             <Button className="p-2" variant="outline">
//                               <Check size={20} className="text-green-400" />
//                             </Button>
//                             <Button className="p-2" variant="outline">
//                               <X size={20} className="text-red-400" />
//                             </Button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminApplications;

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Check, Filter, X } from "lucide-react";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [internshipData, setInternshipData] = useState({});
  const [jobData, setJobData] = useState({});
  const [userData, setUserData] = useState({});
  const [filters, setFilters] = useState({
    title: "",
    username: "",
    companyName: "",
    status: "",
    type: "",
  });

  useEffect(() => {
    const fetchUserData = async (clerkId) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/fetch-user/${clerkId}`
        );
        return response.data;
      } catch (error) {
        console.error(`Error fetching user ${clerkId}:`, error);
        return null;
      }
    };

    const fetchApplicationData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/fetch-all-applications"
        );
        setApplications(res.data);

        // Fetch data for internships
        const internshipPromises = res.data.flatMap((application) =>
          application.internships.map((internship) =>
            axios.get(
              `http://localhost:4000/fetch-internship/${internship.internId}`
            )
          )
        );
        const internshipResponses = await Promise.all(internshipPromises);
        const internshipData = {};
        internshipResponses.forEach((response) => {
          internshipData[response.data._id] = {
            title: response.data.title,
            company: response.data.companyName,
            appliedPeople: response.data.appliedPeople,
          };
        });
        setInternshipData(internshipData);

        // Fetch data for jobs
        const jobPromises = res.data.flatMap((application) =>
          application.jobs.map((job) =>
            axios.get(`http://localhost:4000/fetch-job/${job.jobId}`)
          )
        );
        const jobResponses = await Promise.all(jobPromises);
        const jobData = {};
        jobResponses.forEach((response) => {
          jobData[response.data._id] = {
            title: response.data.title,
            company: response.data.companyName,
            appliedPeople: response.data.appliedPeople,
          };
        });
        setJobData(jobData);

        // Fetch usernames, emails, and imageUrls for applied users
        const allClerkIds = res.data.map((application) => application.clerkId);
        const uniqueClerkIds = [...new Set(allClerkIds)];
        const userPromises = uniqueClerkIds.map((clerkId) =>
          fetchUserData(clerkId)
        );
        const userResponses = await Promise.all(userPromises);
        const userData = {};
        userResponses.forEach((user) => {
          if (user) {
            userData[user.id] = {
              username: user.username,
              imageUrl: user.image_url,
              email: user.email_addresses[0].email_address,
            };
          }
        });
        setUserData(userData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchApplicationData();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      title: "",
      username: "",
      companyName: "",
      status: "",
      type: "",
    });
  };

  const fetchResume = async (clerkId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/resume-present/${clerkId}`
      );
      // Assuming the response contains the resume data to display or download
      console.log(response.data.resume); // Handle the response data to display or download the resume
      window.open(response.data.resume, "_blank");
    } catch (error) {
      console.error("Error fetching resume:", error);
      // Handle error fetching resume
    }
  };

  const filteredApplications = applications
    .map((application) => {
      const filteredInternships = application.internships.filter(
        (internship) => {
          const internshipDataItem = internshipData[internship.internId] || {};

          return (
            (!filters.title ||
              internshipDataItem.title
                ?.toLowerCase()
                .includes(filters.title.toLowerCase())) &&
            (!filters.username ||
              userData[application.clerkId]?.username
                ?.toLowerCase()
                .includes(filters.username.toLowerCase())) &&
            (!filters.companyName ||
              internshipDataItem.company
                ?.toLowerCase()
                .includes(filters.companyName.toLowerCase())) &&
            (!filters.status || internship.status === filters.status) &&
            (!filters.type || filters.type === "Internship")
          );
        }
      );

      const filteredJobs = application.jobs.filter((job) => {
        const jobDataItem = jobData[job.jobId] || {};

        return (
          (!filters.title ||
            jobDataItem.title
              ?.toLowerCase()
              .includes(filters.title.toLowerCase())) &&
          (!filters.username ||
            userData[application.clerkId]?.username
              ?.toLowerCase()
              .includes(filters.username.toLowerCase())) &&
          (!filters.companyName ||
            jobDataItem.company
              ?.toLowerCase()
              .includes(filters.companyName.toLowerCase())) &&
          (!filters.status || job.status === filters.status) &&
          (!filters.type || filters.type === "Job")
        );
      });

      return {
        ...application,
        internships: filteredInternships,
        jobs: filteredJobs,
      };
    })
    .filter(
      (application) =>
        application.internships.length > 0 || application.jobs.length > 0
    );

  return (
    <>
      <div className="p-7 flex justify-between">
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
                Applications
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="px-10">
        <h1 className="font-semibold text-3xl my-1">All Applications</h1>
        <div>
          <div className="flex px-[15vw] gap-4">
            <div className="w-[25vw] shadow-lg dark:bg-slate-800 rounded-sm p-5 flex flex-col gap-2 h-fit sticky top-5">
              <h1 className="text-center font-semibold text-xl capitalize flex items-center justify-center gap-1">
                <Filter size={22} className="text-slate-400" /> filters
              </h1>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={filters.title}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  value={filters.username}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Company name</Label>
                <Input
                  type="text"
                  name="companyName"
                  value={filters.companyName}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="space-y-2">
                <Select
                  name="status"
                  value={filters.status}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Declined">Declined</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Select
                  name="type"
                  value={filters.type}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Job">Job</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="ghost"
                className="mt-2"
                onClick={handleClearFilters}
              >
                Clear All
              </Button>
            </div>
            <div>
              {filteredApplications.map((application, index) => (
                <div key={index} className="mb-4 p-4 shadow-lg rounded-md">
                  <h2 className="font-semibold text-lg mb-2">
                    Application {index + 1}
                  </h2>
                  <div className="flex justify-between">
                    <div>
                      <p>
                        Applicant:{" "}
                        {userData[application.clerkId]?.username ||
                          "Fetching..."}
                      </p>
                      <p>
                        Email:{" "}
                        {userData[application.clerkId]?.email || "Fetching..."}
                      </p>
                      <p className="font-semibold text-sky-500 cursor-pointer">
                        <span
                          onClick={() => fetchResume(application.clerkId)}
                          className="cursor-pointer"
                        >
                          Resume
                        </span>
                      </p>
                    </div>
                    <div>
                      {userData[application.clerkId]?.imageUrl && (
                        <div className="">
                          <Avatar>
                            <AvatarImage
                              src={userData[application.clerkId]?.imageUrl}
                            />
                            <AvatarFallback>User</AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                    </div>
                  </div>
                  {application.internships.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-semibold">Internships:</h3>
                      {application.internships.map((internship, idx) => (
                        <div
                          key={idx}
                          className="p-4 mb-4 border rounded shadow flex items-center justify-between"
                        >
                          <div>
                            <p>Intern ID: {internship.internId}</p>
                            <p>
                              Title:{" "}
                              {internshipData[internship.internId]?.title}
                            </p>
                            <p>
                              Company:{" "}
                              {internshipData[internship.internId]?.company}
                            </p>
                            <p>Status: {internship.status}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button className="p-2" variant="outline">
                              <Check size={20} className="text-green-400" />
                            </Button>
                            <Button className="p-2" variant="outline">
                              <X size={20} className="text-red-400" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {application.jobs.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-semibold">Jobs:</h3>
                      {application.jobs.map((job, idx) => (
                        <div
                          key={idx}
                          className="p-4 mb-4 border rounded shadow flex items-center justify-between"
                        >
                          <div>
                            <p>Job ID: {job.jobId}</p>
                            <p>Title: {jobData[job.jobId]?.title}</p>
                            <p>Company: {jobData[job.jobId]?.company}</p>
                            <p>Status: {job.status}</p>
                            <p>
                              Applied People:{" "}
                              {jobData[job.jobId]?.appliedPeople
                                .map((clerkId) => userData[clerkId]?.username)
                                .filter((username) => username)
                                .join(", ")}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button className="p-2" variant="outline">
                              <Check size={20} className="text-green-400" />
                            </Button>
                            <Button className="p-2" variant="outline">
                              <X size={20} className="text-red-400" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminApplications;
