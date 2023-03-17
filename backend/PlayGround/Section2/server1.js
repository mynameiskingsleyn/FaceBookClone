const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const userRoutes = require("./routes/user");
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("welcome from home");
});
app.get("/books", (req, res) => {
  res.send("welcome from books good!!");
});
app.listen(8000, () => {
  console.log("server is lestining...");
});
