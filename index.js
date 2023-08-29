const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("./public/weather.html", { root: __dirname });
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
