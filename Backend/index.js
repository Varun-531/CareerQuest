const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Internship = require("./models/Internships");
const Job = require("./models/Jobs");

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

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`MongoDB connected: ${mongoose.connection.name}`))
  .catch((err) => console.log(err));

app.post(
  "/add-internship",
  // verifyToken,
  upload.single("companyLogo"),
  async (req, res) => {
    const {
      title,
      startDate,
      companyName,
      stipend,
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
  }
);

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

app.post(
  "/add-job",
  // verifyToken,
  upload.single("companyLogo"),
  async (req, res) => {
    const {
      title,
      startDate,
      companyName,
      salary,
      openings,
      location,
      // duration,
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
      }

      const newJob = new Job({
        title,
        startDate,
        companyName,
        companyLogo: companyLogoUrl,
        salary,
        location,
        openings,
        // duration,
        applyBy,
        aboutInternship,
        perks: perks.split("\n"),
        skills: skills.split("\n"),
        whoCanApply: whoCanApply.split("\n"),
        aboutCompany,
      });

      await newJob.save();
      res.status(201).json(newJob);
    } catch (error) {
      console.error("Error adding internship:", error);
      res
        .status(500)
        .json({ message: error.message || "Failed to add internship" });
    }
  }
);

app.get("/fetch-internship/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const internship = await Internship.findById(id);
    res.status(200).json(internship);
  } catch (error) {
    console.error("Error fetching internship:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to fetch internship" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
