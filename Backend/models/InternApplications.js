const mongoose = require("mongoose");

const InternApplicationsSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  internships: [
    {
      internId: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
        default: "Pending",
      },
    },
  ],
  jobs: [
    {
      jobId: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
        default: "Pending",
      },
    },
  ],
});

module.exports = mongoose.model("InternApplications", InternApplicationsSchema);
