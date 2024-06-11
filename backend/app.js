import express from "express";
// import morgan from "morgan";
import dotenv from "dotenv";
import mySqlPool from "./config/db.js"; // Added .js extension
import cors from "cors";
import { env } from "process";
dotenv.config();

//rest object

const app = express();

//middleware
app.use(cors());
app.use(express.json());
//app.use(morgan("dev"));

//routes
import inventoryRoutes from "./routes/inventoryRoutes.js"; // Added .js extension
app.use("/api/v1/inventory", inventoryRoutes);
app.get("/test", (req, res) => {
  res.status(200).send("<hw>Welcome</h1>");
});

//port
const { PORT } = env;

//conditionally Listen
mySqlPool.query("SELECT 1").then(() => {
  console.log("MySQL DB Connected");
  //listen
  app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });
})
  .catch((error) => {
    console.log(error);
  });
