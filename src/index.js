import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import dbConnector from "./app.js";
import morgan from "morgan";
import cors from "cors";
import { I18n } from "i18n";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4200;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Internationalization setup
const i18n = new I18n();
i18n.configure({
  locales: ['en','fr', 'rw'],
  directory: path.join(__dirname, './locales'),
  defaultLocale: 'en',
  queryParameter: 'lang',
  autoReload: true,
  syncFiles: true,
  cookie: 'lang',
  updateFiles: true,
});
app.use(i18n.init);

// Routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    author: "John, Alex, Peter",
    message: "Welcome to the Hova Ai API",
  });
});


// Database connection
dbConnector;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port: http://localhost:${PORT}`);
});
