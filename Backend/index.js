// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const Internship = require("./models/Internships");

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Multer setup for file uploads
// const storage = multer.diskStorage({});
// const upload = multer({ storage });

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log(`${mongoose.connection.name}`))
//   .catch((err) => console.log(err));

// // POST route to add internship
// app.post("/add-internship", upload.single("companyLogo"), async (req, res) => {
//   const {
//     title,
//     startDate,
//     companyName,
//     stipend,
//     openings,
//     location,
//     duration,
//     applyBy,
//     aboutInternship,
//     perks,
//     skills,
//     whoCanApply,
//     aboutCompany,
//   } = req.body;
//   const companyLogo = req.file ? req.file.path : null;

//   const newInternship = new Internship({
//     title,
//     startDate,
//     companyName,
//     companyLogo,
//     stipend,
//     location,
//     openings,
//     duration,
//     applyBy,
//     aboutInternship,
//     perks,
//     skills,
//     whoCanApply,
//     aboutCompany,
//   });

//   try {
//     if (companyLogo) {
//       const result = await cloudinary.uploader.upload(companyLogo);
//       newInternship.companyLogo = result.url;
//     }

//     await newInternship.save();
//     res.status(201).json(newInternship);
//   } catch (error) {
//     console.error("Error adding internship:", error);
//     res.status(500).json({ message: "Failed to add internship" });
//   }
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Internship = require("./models/Internships");

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

app.post("/add-internship", upload.single("companyLogo"), async (req, res) => {
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
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
