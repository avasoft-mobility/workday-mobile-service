import express, { Request, Response } from "express";
import { Rollbar } from "../helpers/Rollbar";
import MobileVersionDb from "../schema/MobileVersionSchema";

const router = express.Router();

router.get("/versions", (req: Request, res: Response) => {
  try {
    getLatestAppVersion(req.query["appId"] as string)
      .then((mobileVersion) => {
        return res.status(200).json({ data: mobileVersion });
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

const getLatestAppVersion = async (appId: string) => {
  var queryResult = await MobileVersionDb.findOne({
    appId: appId,
  });
  return queryResult;
};

export { router as mobileRouter };
