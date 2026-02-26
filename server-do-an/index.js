import express from "express";
const app = express();
import routes from "./src/router.js";
import connectionDB from "./src/connectDB.js";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";


dotenv.config();
connectionDB();

app.use(
  cors({
    origin: process.env.LOCAL_WEB,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const userAgent = req.get("User-Agent");
  console.log("---------------------------------------------");
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(`User-Agent: ${userAgent}`);
  console.log("---------------------------------------------");
  next();
});

// router
app.use("/api", routes);

app.listen(process.env.PORT, function () {
  console.log(`Your app is running at port ${process.env.PORT}`);
});
