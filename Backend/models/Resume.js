const mongoose = require("mongoose");
const ResumeSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", ResumeSchema);
