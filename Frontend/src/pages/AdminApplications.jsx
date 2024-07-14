// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const AdminApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [internshipTitles, setInternshipTitles] = useState({});
//   const [jobTitles, setJobTitles] = useState({});

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/fetch-all-applications")
//       .then(async (res) => {
//         setApplications(res.data);

//         // Fetch titles for internships
//         const internshipPromises = res.data.flatMap((application) =>
//           application.internships.map((internship) =>
//             axios.get(
//               `http://localhost:4000/fetch-internship/${internship.internId}`
//             )
//           )
//         );
//         const internshipResponses = await Promise.all(internshipPromises);
//         const internshipTitles = {};
//         internshipResponses.forEach((response) => {
//           internshipTitles[response.data._id] = response.data.title;
//         });
//         setInternshipTitles(internshipTitles);

//         // Fetch titles for jobs
//         const jobPromises = res.data.flatMap((application) =>
//           application.jobs.map((job) =>
//             axios.get(`http://localhost:4000/fetch-job/${job.jobId}`)
//           )
//         );
//         const jobResponses = await Promise.all(jobPromises);
//         const jobTitles = {};
//         jobResponses.forEach((response) => {
//           jobTitles[response.data._id] = response.data.title;
//         });
//         setJobTitles(jobTitles);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <>
//       <div className="p-10">
//         <h1 className="font-semibold text-3xl">All Applications</h1>
//         <div>
//           <h2 className="font-semibold text-2xl mt-6">
//             Internship Applications
//           </h2>
//           {applications.map((application, index) => (
//             <div key={index}>
//               {application.internships.map((internship, idx) => (
//                 <div key={idx} className="p-4 mb-4 border rounded shadow">
//                   <p>Intern ID: {internship.internId}</p>
//                   <p>Title: {internshipTitles[internship.internId]}</p>
//                   <p>Status: {internship.status}</p>
//                 </div>
//               ))}
//             </div>
//           ))}

//           <h2 className="font-semibold text-2xl mt-6">Job Applications</h2>
//           {applications.map((application, index) => (
//             <div key={index}>
//               {application.jobs.map((job, idx) => (
//                 <div key={idx} className="p-4 mb-4 border rounded shadow">
//                   <p>Job ID: {job.jobId}</p>
//                   <p>Title: {jobTitles[job.jobId]}</p>
//                   <p>Status: {job.status}</p>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminApplications;

import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [internshipData, setInternshipData] = useState({});
  const [jobData, setJobData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/fetch-all-applications")
      .then(async (res) => {
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
            // description: response.data.description,
            company: response.data.companyName,
            // Add other fields as necessary
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
            // description: response.data.description,
            company: response.data.companyName,
            // Add other fields as necessary
          };
        });
        setJobData(jobData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="p-10">
        <h1 className="font-semibold text-3xl">All Applications</h1>
        <div>
          <h2 className="font-semibold text-2xl mt-6">
            Internship Applications
          </h2>
          {applications.map((application, index) => (
            <div key={index}>
              {application.internships.map((internship, idx) => (
                <div key={idx} className="p-4 mb-4 border rounded shadow">
                  <p>Intern ID: {internship.internId}</p>
                  <p>Title: {internshipData[internship.internId]?.title}</p>
                  <p>
                    {/* Description:{" "} */}
                    {/* {internshipData[internship.internId]?.description} */}
                  </p>
                  <p>Company: {internshipData[internship.internId]?.company}</p>
                  <p>Status: {internship.status}</p>
                </div>
              ))}
            </div>
          ))}

          <h2 className="font-semibold text-2xl mt-6">Job Applications</h2>
          {applications.map((application, index) => (
            <div key={index}>
              {application.jobs.map((job, idx) => (
                <div key={idx} className="p-4 mb-4 border rounded shadow">
                  <p>Job ID: {job.jobId}</p>
                  <p>Title: {jobData[job.jobId]?.title}</p>
                  {/* <p>Description: {jobData[job.jobId]?.description}</p> */}
                  <p>Company: {jobData[job.jobId]?.company}</p>
                  <p>Status: {job.status}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminApplications;
