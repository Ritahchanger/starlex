const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const connectDatabase = require("./database/databaseConnection");

dotenv.config();

const app = express();

const morgan = require("morgan");

const errorHandler = require("./middleware/errorHandler");

const verifyToken = require("./middleware/authToken").verifyToken;

const cookieParser = require("cookie-parser");

app.use(morgan("dev"));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "25mb" }));

app.use(express.urlencoded({ extended: true, limit: "25mb" }));

connectDatabase();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1/newseller", require("./routes/newsletters.route"));

app.use("/api/v1/contact/message", require("./routes/contact.route"));

app.use("/api/v1/auth", require("./routes/auth.route"));

app.use("/api/v1/quotation", require("./routes/quotation.route"));

app.use("/api/v1/admin", verifyToken, require("./routes/admin.route"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is up and listening on http://localhost:${PORT}`);
});
