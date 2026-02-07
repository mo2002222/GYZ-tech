const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

conn;

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;
