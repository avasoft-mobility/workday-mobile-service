import express, { Request, Response } from "express";
import { Rollbar } from "../helpers/Rollbar";
import MobileVersionDb from "../schema/MobileVersionSchema";

const router = express.Router();

router.get("/versions", async (req: Request, res: Response) => {
  try {
    const mobileVersion = await MobileVersionDb.findOne({
      appid: req.query["appId"],
    });

    if (!mobileVersion) {
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

export { router as mobileRouter };
