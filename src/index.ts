import { json } from "body-parser";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { mobileRouter } from "./routes/MobileAppController";

const app = express();

app.use(json());

app.get("/", (request: Request, response: Response) => {
  return response.send("Mobile backend is healthy");
});

app.use("/mobile", mobileRouter);

mongoose.connect("mongodb://localhost:27017", () => {
  console.log("DB is connected");
});

app.listen(3000, () => {
  console.log("server listening to port 3000");
});
