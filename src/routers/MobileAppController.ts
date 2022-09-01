import express, { Request, Response } from "express";
import { Rollbar } from "../helpers/RollBar";
import MobileVersionDb from "../schema/MobileVersionSchema";

const router = express.Router();

router.get("/check", (req, res) => {
  return res.send({ message: "Mobile Service is working fine" });
});

router.get("/todos", (req, res) => {
  return res.send({ message: "Todo Service is working fine" });
});

router.get("/attendance", (req, res) => {
  return res.send({ message: "Attendance Service is working fine" });
});

router.get("/users", (req, res) => {
  return res.send({ message: "Users Service is working fine" });
});

router.post("/versions", (req: Request, res: Response) => {
  try {
    
    if (!req.query["appId"] || req.query["appId"] === "") {
      return res.status(401).json({ message: "app id is required." });
    }

    if (!req.body["latestversion"] || req.body["latestversion"] === "") {
      return res.status(401).json({ message: "latest version is required" });
    }

    if (req.body["isrequired"] === undefined) {
      return res
        .status(401)
        .json({ message: "parameter 'isrequired' must be passed" });
    }
    const appid = req.query["appId"].toString();
    updateMobileVerison(
      appid,
      req.body["latestversion"].toString(),
      req.body["isrequired"] as boolean
    )
      .then((mobileversion) => {
        return res.status(200).json({ data: mobileversion });
      })
      .catch((error) => {
        return res.status(500).json({ message: error });
      });
  } catch (error) {
    Rollbar.error(error as unknown as Error, req);
    return res
      .status(500)
      .json({ message: (error as unknown as Error).message });
  }
});


router.get("/versions", async (req: Request, res: Response) => {
  try {
    const mobileVersion = await MobileVersionDb.findOne({
      appid: req.query["appId"],
    });

    if (mobileVersion===null) {
      return res
        .status(404)
        .json({ message: "No result available for this app ID" });
    }

    return res.status(200).json({ data: mobileVersion });
  } catch (error) {
    Rollbar.error(error as unknown as Error, req);
    return res
      .status(500)
      .json({ message: (error as unknown as Error).message });
  }
});

const updateMobileVerison = async (
  appid: string,
  latestversion: string,
  isrequired: boolean
) => {
  var newItem = {
    appid: appid,
    latestversion: latestversion,
    isrequired: isrequired,
  };
  var queryResult = await MobileVersionDb.find({
    appid: newItem.appid,
  });
  if (queryResult.length !== 0) {
    return await MobileVersionDb.findOne({ appid: appid }).updateOne(newItem);
  } else {
    return await MobileVersionDb.create(newItem);
  }
};

export { router as mobileRouter };
