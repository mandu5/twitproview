const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("build"));

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
}); 

app.use("/api", require("./routes/api.route.tsx"));

app.use((req, res, next) => {
  next(createError.NotFound()); 
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ server is running at: ${PORT}`));