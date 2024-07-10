const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs"); // To handle file deletion after upload
const Internship = require("./models/Internships");
const Job = require("./models/Jobs");
const Resume = require("./models/Resume");
const InternApplications = require("./models/InternApplications");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upload = multer({ dest: "uploads/" });
const resumeUpload = multer({ dest: "resumes/" });
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
};
mongoose
  .connect(process.env.MONGO_URL, options)
  .then(() => console.log(`MongoDB connected: ${mongoose.connection.name}`))
  .catch((err) => console.log(err));

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token:", token);
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token not found. User must sign in." });
  }

  try {
    // const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const verifiedToken = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    console.log("Verified Token:", verifiedToken);

    // Check if the token is expired or not yet valid
    const currentTime = Math.floor(Date.now() / 1000);
    if (verifiedToken.exp < currentTime || verifiedToken.nbf > currentTime) {
      throw new Error("Token is expired or not yet valid");
    }

    // Check if the token is issued by a permitted origin
    const permittedOrigins = ["http://localhost:4000", "https://example.com"]; // Replace with your permitted origins
    if (verifiedToken.azp && !permittedOrigins.includes(verifiedToken.azp)) {
      throw new Error("Invalid 'azp' claim");
    }

    req.user = verifiedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token not verified." });
  }
};

app.post("/add-internship", upload.single("companyLogo"), async (req, res) => {
  const {
    title,
    startDate,
    companyName,
    stipend,
    job,
    openings,
    location,
    duration,
    applyBy,
    aboutInternship,
    perks = "",
    skills = "",
    whoCanApply,
    aboutCompany,
  } = req.body;

  const companyLogo = req.file ? req.file.path : null;

  try {
    let companyLogoUrl = null;
    if (companyLogo) {
      const result = await cloudinary.uploader.upload(companyLogo);
      companyLogoUrl = result.url;
      fs.unlinkSync(companyLogo); // Delete file after upload
    }

    const newInternship = new Internship({
      title,
      startDate,
      companyName,
      companyLogo: companyLogoUrl,
      stipend,
      location,
      openings,
      duration,
      job,
      applyBy,
      aboutInternship,
      perks: perks.split("\n"),
      skills: skills.split("\n"),
      whoCanApply: whoCanApply.split("\n"),
      aboutCompany,
    });

    await newInternship.save();
    res.status(201).json(newInternship);
  } catch (error) {
    console.error("Error adding internship:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to add internship" });
  }
});

app.post("/check-intern-application", async (req, res) => {
  const { clerkId, internId } = req.body;
  console.log("clerkId", clerkId, "internId", internId);

  if (!clerkId || !internId) {
    return res
      .status(400)
      .json({ message: "clerkId and internId are required" });
  }

  try {
    const application = await InternApplications.findOne({
      clerkId,
    });

    if (!application) {
      return res.status(200).json({ applied: false });
    }

    // Check if the internId exists in the internships array
    const isApplied = application.internships.some(
      (internship) => internship.internId === internId
    );

    res.status(200).json({ applied: isApplied });
  } catch (error) {
    console.error("Error checking application:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to check application" });
  }
});

app.post("/check-job-application", async (req, res) => {
  const { clerkId, jobId } = req.body;
  console.log("clerkId", clerkId, "jobId", jobId);

  if (!clerkId || !jobId) {
    return res.status(400).json({ message: "clerkId and jobId are required" });
  }

  try {
    const application = await InternApplications.findOne({
      clerkId,
    });

    if (!application) {
      return res.status(200).json({ applied: false });
    }

    // Check if the jobId exists in the internships array
    const isApplied = application.jobs.some(
      (internship) => internship.jobId === jobId
    );

    res.status(200).json({ applied: isApplied });
  } catch (error) {
    console.error("Error checking application:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to check application" });
  }
});

app.get("/all-internships", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json(internships);
  } catch (error) {
    console.error("Error fetching internships:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to fetch internships" });
  }
});

app.get("/all-jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: error.message || "Failed to fetch jobs" });
  }
});

app.post("/add-job", upload.single("companyLogo"), async (req, res) => {
  const {
    title,
    startDate,
    companyName,
    salary,
    openings,
    location,
    fresherJob,
    ctc,
    applyBy,
    aboutInternship,
    perks = "",
    skills = "",
    whoCanApply,
    aboutCompany,
  } = req.body;

  const companyLogo = req.file ? req.file.path : null;

  try {
    let companyLogoUrl = null;
    if (companyLogo) {
      const result = await cloudinary.uploader.upload(companyLogo);
      companyLogoUrl = result.url;
      fs.unlinkSync(companyLogo); // Delete file after upload
    }

    const newJob = new Job({
      title,
      startDate,
      companyName,
      companyLogo: companyLogoUrl,
      salary,
      location,
      openings,
      applyBy,
      fresherJob,
      ctc,
      aboutInternship,
      perks: perks.split("\n"),
      skills: skills.split("\n"),
      whoCanApply: whoCanApply.split("\n"),
      aboutCompany,
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ message: error.message || "Failed to add job" });
  }
});

app.post("/apply-internship", async (req, res) => {
  const { clerkId, internId } = req.body;
  console.log("clerkId", clerkId, "internId", internId);
  // return res.status(200).json({ message: "Success" });
  if (!clerkId || !internId) {
    return res
      .status(400)
      .json({ message: "clerkId and internId are required" });
  }
  try {
    let existingApplication = await InternApplications.findOne({ clerkId });

    if (existingApplication) {
      // Check if the internship already exists
      const internshipIndex = existingApplication.internships.findIndex(
        (internship) => internship.internId === internId
      );

      if (internshipIndex === -1) {
        // If the internship does not exist, add it
        existingApplication.internships.push({
          internId: internId,
          status: "Pending",
        });
      } else {
        // If the internship exists, update the status
        existingApplication.internships[internshipIndex].status = "Pending";
      }

      await existingApplication.save();
      res.status(200).json(existingApplication);
    } else {
      // If there is no existing application, create a new one
      const newApplication = new InternApplications({
        clerkId,
        internships: [
          {
            internId: internId,
            status: "Pending",
          },
        ],
      });
      await newApplication.save();
      res.status(201).json(newApplication);
    }

    // Add clerkId to internship.appliedPeople
    const internship = await Internship.findById(internId);
    if (internship) {
      internship.appliedPeople.push(clerkId);
      await internship.save();
    }
  } catch (error) {
    console.error("Error applying internship:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to apply internship" });
  }
});

app.post("/apply-job", async (req, res) => {
  const { clerkId, jobId } = req.body;
  console.log("clerkId", clerkId, "jobId", jobId);
  // return res.status(200).json({ message: "Success" });
  if (!clerkId || !jobId) {
    return res.status(400).json({ message: "clerkId and jobId are required" });
  }
  try {
    let existingApplication = await InternApplications.findOne({ clerkId });

    if (existingApplication) {
      // Check if the internship already exists
      const internshipIndex = existingApplication.jobs.findIndex(
        (internship) => internship.jobId === jobId
      );

      if (internshipIndex === -1) {
        // If the internship does not exist, add it
        existingApplication.jobs.push({
          jobId: jobId,
          status: "Pending",
        });
      } else {
        // If the internship exists, update the status
        existingApplication.jobs[internshipIndex].status = "Pending";
      }

      await existingApplication.save();
      res.status(200).json(existingApplication);
    } else {
      // If there is no existing application, create a new one
      const newApplication = new InternApplications({
        clerkId,
        jobs: [
          {
            jobId: jobId,
            status: "Pending",
          },
        ],
      });
      await newApplication.save();
      res.status(201).json(newApplication);
    }

    // Add clerkId to internship.appliedPeople
    const job = await Job.findById(jobId);
    if (job) {
      job.appliedPeople.push(clerkId);
      await job.save();
    }
  } catch (error) {
    console.error("Error applying job:", error);
    res.status(500).json({ message: error.message || "Failed to apply job" });
  }
});

app.get("/fetch-internship/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const internship = await Internship.findById(id).sort({ createdAt: -1 });
    res.status(200).json(internship);
  } catch (error) {
    console.error("Error fetching internship:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to fetch internship" });
  }
});

app.get("/fetch-job/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Job.findById(id).sort({ createdAt: -1 });
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: error.message || "Failed to fetch job" });
  }
});

app.post("/add-resume", resumeUpload.single("resume"), async (req, res) => {
  const { clerkId, resume } = req.body;
  // const resume = req.file ? req.file.path : null;
  console.log("clerkId", clerkId, "resume", resume);
  try {
    if (!resume) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const result = await cloudinary.uploader.upload(resume, {
      resource_type: "auto",
    });

    const resumeUrl = result.url;
    fs.unlinkSync(resume);

    let existingResume = await Resume.findOne({ clerkId });

    if (existingResume) {
      existingResume.resume = resumeUrl;
      await existingResume.save();
      res.status(200).json(existingResume);
    } else {
      const newResume = new Resume({ clerkId, resume: resumeUrl });
      await newResume.save();
      res.status(201).json(newResume);
    }
  } catch (error) {
    console.error("Error adding/updating resume:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to add/update resume" });
  }
});

app.get("/fetch-applications/:clerkId", async (req, res) => {
  const clerkId = req.params.clerkId;
  try {
    const applications = await InternApplications.findOne({ clerkId });
    if (applications) {
      res.status(200).json(applications);
    } else {
      res.status(404).json({ message: "Applications not found" });
    }
  } catch (error) {
    console.error("Error fetching applications:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to fetch applications" });
  }
});

app.get("/resume-present/:clerkId", async (req, res) => {
  const clerkId = req.params.clerkId;
  try {
    const resume = await Resume.findOne({ clerkId: clerkId });
    if (resume) {
      res.status(200).json(resume);
    } else {
      res.status(404).json({ message: "Resume not found" });
    }
  } catch (error) {
    console.error("Error fetching resume:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to fetch resume" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
