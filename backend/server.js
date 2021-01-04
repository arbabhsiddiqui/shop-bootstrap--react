import express from "express";
import dotenv from "dotenv";
import products from "./data/products.js";

const app = express();

dotenv.config();

app.get("/", (req, res) => {
  res.send("Api Start Working");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

const port = process.env.PORT || 5000;

app.listen(
  5000,
  console.log(
    `Server  Running as ${process.env.NODE_ENV} Environment  on  Port ${port}`
  )
);
