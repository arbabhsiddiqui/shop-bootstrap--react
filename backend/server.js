import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("Api Start Working");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(
  5000,
  console.log(
    `Server  Running as ${process.env.NODE_ENV} Environment  on  Port ${port}`
  )
);
