import { json } from "body-parser";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { mobileRouter } from "./routers/MobileAppController";
import serverless from "serverless-http";
import runMiddleware from "run-middleware";

const app = express();

app.use(json());
runMiddleware(app);

app.get("/", (request: Request, response: Response) => {
  return response.send("Mobile backend is healthy");
});

app.use("/mobile", mobileRouter);

app.use(
  "/mobile/*/functions/MobileFunction/invocations",
  (req: Request, res: Response) => {
    const payload = JSON.parse(Buffer.from(req.body).toString());
    (app as any).runMiddleware(
      payload.path,
      {
        method: payload.httpMethod,
        body: payload.body,
        query: payload.queryParams,
      },
      function (code: any, data: any) {
        res.status(code).json(data);
      }
    );
  }
);

mongoose.connect(process.env.DB_STRING!, () => {
  console.log("DB is connected");
});

if (process.env.LAMBDA !== "TRUE") {
  app.listen(3000, () => {
    console.log("server listening to port 3000");
  });
}

module.exports.lambdaHandler = serverless(app);
