const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
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
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    ctc: {
      type: Boolean,
      required: true,
      default: false,
    },
    fresherJob: {
      type: Boolean,
      required: true,
      default: false,
    },
    openings: {
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
    selectedPeople: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", JobSchema);
