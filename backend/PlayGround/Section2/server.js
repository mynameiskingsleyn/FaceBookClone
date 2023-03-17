const express = require("express");
const cors = require("cors");
const allowedOrigins = ["http://localhost:3000"];

const corsOptions = function (req, res) {
  let tmp;
  let origin = req.header("Origin");
  if (allowedOrigins.indexOf(origin) > -1) {
    tmp = {
      origin: true,
      optionSuccessStatus: 200,
    };
  } else {
    tmp = {
      origin: "false",
    };
  }
  res(null, tmp);
};

const app = express();
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("welcome from home");
});
app.get("/books", (req, res) => {
  res.send("welcome from books good!!");
});
app.listen(8000, () => {
  console.log("server is lestining...");
});
