const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://21pa1a0531:iOryWcoZBvNtt0sC@cluster0.bxmultd.mongodb.net/CareerQuest?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log(`${mongoose.connection.name}`))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("Server is running on port 3001");
});
