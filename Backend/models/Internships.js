// const mongoose = require("mongoose");

// const InternshipSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     companyName: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String, // Updated to camelCase
//       required: true,
//     },
//     startDate: {
//       type: Date,
//       required: true,
//     },
//     companyLogo: {
//       type: String, // Updated to camelCase
//       required: true,
//     },
//     stipend: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     openings: {
//       type: Number, // Updated to camelCase
//       required: true,
//       min: 1,
//     },
//     duration: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//     applyBy: {
//       type: Date,
//       required: true,
//     },
//     aboutInternship: {
//       type: String,
//       required: true,
//     },
//     perks: {
//       type: String,
//       required: true,
//     },
//     skills: {
//       type: String, // Updated to camelCase
//       required: true,
//     },
//     whoCanApply: {
//       type: String, // Updated to camelCase
//       required: true,
//     },
//     aboutCompany: {
//       type: String, // Updated to camelCase
//       required: true,
//     },
//     appliedPeople: {
//       type: [String], // Specify the array type
//       required: true,
//       default: [],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Internship", InternshipSchema); // Updated model name

const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    companyLogo: {
      type: String,
      required: true,
    },
    stipend: {
      type: Number,
      required: true,
      min: 0,
    },
    openings: {
      type: Number,
      required: true,
      min: 1,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    applyBy: {
      type: Date,
      required: true,
    },
    aboutInternship: {
      type: String,
      required: true,
    },
    perks: {
      type: [String],
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    whoCanApply: {
      type: [String],
      required: true,
    },
    aboutCompany: {
      type: String,
      required: true,
    },
    appliedPeople: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Internship", InternshipSchema);
