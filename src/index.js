import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import dbConnector from "./app.js";
import morgan from "morgan";
import cors from "cors";


const app = express();
dotenv.config();

// Configurations
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/v1", router);
dbConnector;
const PORT = process.env.PORT || 4200;

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port: http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    author: "John , Alex , Peter ",
    message: "Welcome to the Hova Ai API!",
  });
});
