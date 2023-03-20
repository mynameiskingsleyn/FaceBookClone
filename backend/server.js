const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
readdirSync("./routes").map((r) => {
  app.use("/", require("./routes/" + r));
});

// database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("databse connected successfully"))
  .catch((err) => console.log("error connection to mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is lestining...on port ${PORT} `);
});
